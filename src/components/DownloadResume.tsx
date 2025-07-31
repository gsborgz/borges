'use client'

import { CloudDownload } from 'lucide-react';
import jsPDF from 'jspdf';
import { Button } from '@components/ui/Button';
import { ResumeData, useResume } from '@hooks/useResume';
import { useTranslation } from 'react-i18next';
import i18n from '@lib/i18n';

export function DownloadResume() {
  const { t } = useTranslation();
  const resumeData = useResume();
  const handleDownload = async () => {
    try {
      generatePDF(resumeData);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      aria-label='Download Resume'
      onClick={() => handleDownload()}
      title={t('downloadResume')}
    >
      <CloudDownload className='h-4 w-4' />
      <span className='sr-only'>Download Resume</span>
    </Button>
  );
}

function generatePDF(resumeData: ResumeData) {
  const currentLanguage = i18n.language || 'pt';
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  const primaryColor = [15, 23, 43]; // #0f172b
  const secondaryColor = [69, 85, 108]; // #45556c
  const primaryFontSize = 12;
  const secondaryFontSize = 10.5;
  const sectionTextFontSize = 9.5;
  const leftColumnWidth = 70;
  const rightColumnWidth = contentWidth - leftColumnWidth - 10;
  const rightColumnX = margin + leftColumnWidth + 10;
  const addTextWithWrap = (text: string, x: number, y: number, maxWidth: number, color: number[] = secondaryColor) => {
    const fontSize = sectionTextFontSize;
    const lineSpacing = 5;

    pdf.setFontSize(fontSize);
    pdf.setTextColor(color[0], color[1], color[2]);

    const lines = pdf.splitTextToSize(text, maxWidth);
    let currentY = y;

    const totalHeight = (lines.length - 1) * lineSpacing + fontSize * 0.35;
    if (currentY + totalHeight > pageHeight - margin) {
      pdf.addPage();
      currentY = margin;
    }

    lines.forEach((line: string, index: number) => {
      pdf.text(line, x, currentY);
      if (index < lines.length - 1) {
        currentY += lineSpacing;
      }
    });

    return currentY + fontSize * 0.35;
  };
  const checkPageBreak = (currentY: number, requiredSpace: number = 15) => {
    if (currentY + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      return margin;
    }
    return currentY;
  };
  const addLineSeparator = (x: number, y: number, width: number, style = 1) => {
    if (style === 1) {
      pdf.setDrawColor(202, 213, 227); // #cad6e3
    } else {
      pdf.setDrawColor(226, 232, 240); // #e2e8f0
    }

    pdf.line(x, y, x + width, y);
  };
  const addSectionTitle = (title: string, x: number, y: number) => {
    pdf.setFontSize(primaryFontSize);
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.text(title.toUpperCase(), x, y);
  };
  const setSectionTextStyle = () => {
    pdf.setFontSize(sectionTextFontSize);
    pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  };

  let yPosition = 25;

  pdf.setFont('helvetica', 'normal');

  // ---- Header ----
    pdf.setFontSize(28);
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.text('GABRIEL DA SILVA BORGES', margin, yPosition);
    yPosition += 7;

    pdf.setFontSize(primaryFontSize);
    pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    pdf.text(resumeData.role.toUpperCase(), margin, yPosition);
    yPosition += 12;
  // ----

  // ---- Section: Summary ----
    addSectionTitle(resumeData.summaryTitle, margin, yPosition);

    yPosition += 2;

    addLineSeparator(margin, yPosition, contentWidth);

    yPosition += 8;

    yPosition = addTextWithWrap(resumeData.summaryDescription, margin, yPosition, contentWidth);
    yPosition += 10;

    let leftColumnY = yPosition;
    let rightColumnY = yPosition;
  // ----

  // ---- Section: Contact ----
    addSectionTitle(resumeData.contactTitle, margin, leftColumnY);

    leftColumnY += 2;

    addLineSeparator(margin, leftColumnY, leftColumnWidth);

    leftColumnY += 8;

    setSectionTextStyle();

    pdf.text(resumeData.contactPhone, margin, leftColumnY);
    leftColumnY += 6;

    pdf.text(resumeData.contactEmail, margin, leftColumnY);
    leftColumnY += 6;

    leftColumnY = addTextWithWrap(resumeData.contactAddress, margin, leftColumnY, leftColumnWidth);
    leftColumnY += 10;
  // ----

  // ---- Section: Skills ----
    addSectionTitle(resumeData.skillsTitle, margin, leftColumnY);

    leftColumnY += 2;

    addLineSeparator(margin, leftColumnY, leftColumnWidth);

    leftColumnY += 8;

    setSectionTextStyle();

    const skills = resumeData.skills.join('  ');

    leftColumnY = addTextWithWrap(skills, margin, leftColumnY, leftColumnWidth);

    leftColumnY += 10;
  // ----
  
  // ---- Section: Languages ----
    addSectionTitle(resumeData.languageSkillsTitle, margin, leftColumnY);

    leftColumnY += 2;

    addLineSeparator(margin, leftColumnY, leftColumnWidth);

    leftColumnY += 8;

    setSectionTextStyle();

    pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    resumeData.languageSkills.forEach((language: string) => {
      pdf.text(language, margin, leftColumnY);
      leftColumnY += 6;
    });

    leftColumnY += 6;
  // ----

  // ---- Section: Education ----
    addSectionTitle(resumeData.studyTitle, margin, leftColumnY);

    leftColumnY += 2;

    addLineSeparator(margin, leftColumnY, leftColumnWidth);

    leftColumnY += 8;

    setSectionTextStyle();
    
    resumeData.courses.forEach((course: any) => {
      leftColumnY = checkPageBreak(leftColumnY, 25); // Verificar espaço para todo o curso

      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      leftColumnY = addTextWithWrap(course.course, margin, leftColumnY, leftColumnWidth, primaryColor);
      leftColumnY += 2;

      pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      
      leftColumnY = addTextWithWrap(course.institution, margin, leftColumnY, leftColumnWidth);
      leftColumnY += 2;
      leftColumnY = addTextWithWrap(course.description, margin, leftColumnY, leftColumnWidth);
      leftColumnY += 2;
      leftColumnY = addTextWithWrap(course.period, margin, leftColumnY, leftColumnWidth);
      leftColumnY += 6;
    });
  //

  // ---- Coluna Direita ----

  // ---- Section: Experiences ----
    addSectionTitle(resumeData.experiencesTitle, rightColumnX, rightColumnY);

    rightColumnY += 2;

    addLineSeparator(rightColumnX, rightColumnY, rightColumnWidth);

    rightColumnY += 8;

    resumeData.experiences.forEach((exp: any, index: number) => {
      rightColumnY = checkPageBreak(rightColumnY, 30); // Verificar espaço para toda a experiência

      // Company e Period na mesma linha
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(secondaryFontSize);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text(exp.company, rightColumnX, rightColumnY);

      // Period alinhado à direita
      const periodWidth = pdf.getTextWidth(exp.period);

      pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.text(exp.period, rightColumnX + rightColumnWidth - periodWidth, rightColumnY);
      rightColumnY += 6;
      
      // Role
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(secondaryFontSize);
      pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.text(exp.role, rightColumnX, rightColumnY);
      rightColumnY += 6;

      setSectionTextStyle();

      // Description
      rightColumnY = addTextWithWrap(exp.description, rightColumnX, rightColumnY, rightColumnWidth);

      // Separador entre experiências (exceto a última)
      if (index < resumeData.experiences.length - 1) {
        rightColumnY += 3;

        addLineSeparator(rightColumnX, rightColumnY, rightColumnWidth, 2);

        rightColumnY += 8;
      }
    });
  // ----

  pdf.save(`gabriel_silva_borges_${currentLanguage}.pdf`);
}
