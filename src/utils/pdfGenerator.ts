import jsPDF from 'jspdf';
import { LeadershipGap } from '../types';
import { calculateLoss, formatCurrency } from './calculations';

export const generatePDFReport = async (gaps: LeadershipGap[], companyName?: string) => {
  const activeGaps = gaps.filter(gap => gap.isActive);
  const gapData = activeGaps.map(gap => ({
    ...gap,
    ...calculateLoss(gap)
  })).filter(gap => gap.annualLoss > 0);

  const totalAnnualLoss = gapData.reduce((sum, gap) => sum + gap.annualLoss, 0);
  const totalMonthlyLoss = gapData.reduce((sum, gap) => sum + gap.monthlyLoss, 0);

  // Create PDF
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredHeight: number) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Header
  pdf.setFillColor(30, 58, 138); // Blue-900
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Leadership Loss Assessment Report', pageWidth / 2, 20, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Comprehensive Analysis of Leadership Gaps & Financial Impact', pageWidth / 2, 30, { align: 'center' });

  yPosition = 60;

  // Company Info
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Executive Summary', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  if (companyName) {
    pdf.text(`Company: ${companyName}`, margin, yPosition);
    yPosition += 6;
  }
  pdf.text(`Report Generated: ${new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Assessment Areas Evaluated: ${activeGaps.length} out of 23`, margin, yPosition);
  yPosition += 15;

  // Key Metrics Box
  checkPageBreak(40);
  pdf.setFillColor(254, 242, 242); // Red-50
  pdf.setDrawColor(254, 202, 202); // Red-200
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 35, 'FD');
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(185, 28, 28); // Red-700
  pdf.text('CRITICAL FINANCIAL IMPACT', margin + 5, yPosition + 10);
  
  pdf.setFontSize(16);
  pdf.setTextColor(220, 38, 38); // Red-600
  pdf.text(`Monthly Loss: ${formatCurrency(totalMonthlyLoss)}`, margin + 5, yPosition + 20);
  pdf.text(`Annual Loss: ${formatCurrency(totalAnnualLoss)}`, margin + 5, yPosition + 30);
  
  yPosition += 50;

  // Top 5 Critical Areas
  checkPageBreak(60);
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Top 5 Critical Leadership Gaps', margin, yPosition);
  yPosition += 10;

  const sortedGaps = [...gapData].sort((a, b) => b.annualLoss - a.annualLoss).slice(0, 5);
  
  sortedGaps.forEach((gap, index) => {
    checkPageBreak(15);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}. ${gap.title}`, margin + 5, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Annual Impact: ${formatCurrency(gap.annualLoss)}`, pageWidth - margin - 50, yPosition);
    yPosition += 5;
    
    const description = gap.description;
    const wrappedText = pdf.splitTextToSize(description, pageWidth - 2 * margin - 10);
    pdf.text(wrappedText, margin + 10, yPosition);
    yPosition += wrappedText.length * 4 + 5;
  });

  // Detailed Breakdown
  checkPageBreak(30);
  pdf.addPage();
  yPosition = margin;
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Detailed Financial Breakdown', margin, yPosition);
  yPosition += 15;

  // Table Header
  pdf.setFillColor(243, 244, 246); // Gray-100
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Leadership Area', margin + 2, yPosition + 5);
  pdf.text('Monthly Loss', margin + 80, yPosition + 5);
  pdf.text('Annual Loss', margin + 120, yPosition + 5);
  pdf.text('Priority', margin + 160, yPosition + 5);
  
  yPosition += 10;

  // Table Rows
  const maxLoss = Math.max(...gapData.map(g => g.annualLoss));
  
  gapData.forEach((gap, index) => {
    checkPageBreak(8);
    
    if (index % 2 === 0) {
      pdf.setFillColor(249, 250, 251); // Gray-50
      pdf.rect(margin, yPosition - 2, pageWidth - 2 * margin, 6, 'F');
    }
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    
    // Truncate long titles
    const title = gap.title.length > 25 ? gap.title.substring(0, 22) + '...' : gap.title;
    pdf.text(title, margin + 2, yPosition + 2);
    pdf.text(formatCurrency(gap.monthlyLoss), margin + 80, yPosition + 2);
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(220, 38, 38); // Red-600
    pdf.text(formatCurrency(gap.annualLoss), margin + 120, yPosition + 2);
    
    // Priority based on loss amount
    const priority = gap.annualLoss > maxLoss * 0.7 ? 'HIGH' : 
                    gap.annualLoss > maxLoss * 0.3 ? 'MEDIUM' : 'LOW';
    
    if (priority === 'HIGH') {
      pdf.setTextColor(220, 38, 38); // Red-600
    } else if (priority === 'MEDIUM') {
      pdf.setTextColor(245, 158, 11); // Orange-500
    } else {
      pdf.setTextColor(34, 197, 94); // Green-500
    }
    
    pdf.text(priority, margin + 160, yPosition + 2);
    
    pdf.setTextColor(0, 0, 0);
    yPosition += 6;
  });

  // Recommendations
  checkPageBreak(80);
  yPosition += 10;
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Strategic Recommendations', margin, yPosition);
  yPosition += 10;

  const recommendations = [
    {
      title: 'Immediate Action Required (Next 30 Days)',
      items: sortedGaps.slice(0, 2).map(gap => 
        `Address ${gap.title} - Potential savings: ${formatCurrency(gap.annualLoss)}`
      )
    },
    {
      title: 'Medium-term Focus (Next 90 Days)',
      items: sortedGaps.slice(2, 4).map(gap => 
        `Implement solutions for ${gap.title} - Impact: ${formatCurrency(gap.annualLoss)}`
      )
    },
    {
      title: 'Long-term Development (Next 6 Months)',
      items: [
        'Establish comprehensive leadership development program',
        'Create measurement systems for leadership effectiveness',
        'Build internal coaching capabilities'
      ]
    }
  ];

  recommendations.forEach(section => {
    checkPageBreak(25);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(section.title, margin, yPosition);
    yPosition += 8;
    
    section.items.forEach(item => {
      checkPageBreak(6);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      const wrappedItem = pdf.splitTextToSize(`• ${item}`, pageWidth - 2 * margin - 10);
      pdf.text(wrappedItem, margin + 5, yPosition);
      yPosition += wrappedItem.length * 4 + 1;
    });
    yPosition += 5;
  });

  // ROI Projection
  checkPageBreak(40);
  pdf.setFillColor(240, 253, 244); // Green-50
  pdf.setDrawColor(187, 247, 208); // Green-200
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 30, 'FD');
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(21, 128, 61); // Green-700
  pdf.text('Investment ROI Projection', margin + 5, yPosition + 8);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  pdf.text('If 50% of identified gaps are addressed within 12 months:', margin + 5, yPosition + 16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(21, 128, 61);
  pdf.text(`Potential Annual Savings: ${formatCurrency(totalAnnualLoss * 0.5)}`, margin + 5, yPosition + 22);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Typical Investment: ${formatCurrency(totalAnnualLoss * 0.1)} - ${formatCurrency(totalAnnualLoss * 0.2)}`, margin + 5, yPosition + 28);

  // Footer
  pdf.setTextColor(107, 114, 128); // Gray-500
  pdf.setFontSize(8);
  pdf.text('This report is generated based on your assessment inputs. Actual results may vary.', 
           pageWidth / 2, pageHeight - 10, { align: 'center' });

  return pdf;
};

export const printReport = () => {
  // Create a print-friendly version of the current page
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Pop-up blocked. Please allow pop-ups for this site to print the report.');
    return;
  }

  const printContent = document.querySelector('[data-print-content]');
  if (!printContent) {
    alert('No content available for printing');
    printWindow.close();
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Leadership Loss Assessment Report</title>
      <style>
        @page { margin: 1in; size: A4; }
        body { font-family: Arial, sans-serif; line-height: 1.4; color: #000; }
        .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; margin-bottom: 20px; }
        .summary-box { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; margin: 20px 0; }
        .critical-loss { color: #dc2626; font-weight: bold; font-size: 18px; }
        .gap-item { margin: 10px 0; padding: 10px; border-left: 3px solid #dc2626; }
        .no-print { display: none; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f3f4f6; }
        .high-priority { color: #dc2626; font-weight: bold; }
        .medium-priority { color: #f59e0b; font-weight: bold; }
        .low-priority { color: #22c55e; font-weight: bold; }
      </style>
    </head>
    <body>
      ${printContent.innerHTML}
    </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  
  // Wait for content to load before printing
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};