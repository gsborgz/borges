'use client'

import { CloudDownload } from 'lucide-react';
import jsPDF from 'jspdf';
import { Button } from '@components/ui/Button';
import { useResume } from '@hooks/useResume';
import { useTranslation } from 'react-i18next';

export function DownloadResume() {
  const { t } = useTranslation();
  const resumeData = useResume();
  
  const handleDownload = async () => {
    try {
      let yPosition = 25;
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
      const addTextWithWrap = (text: string, x: number, y: number, maxWidth: number, color: number[] = secondaryColor) => {
        const fontSize = sectionTextFontSize;

        pdf.setFontSize(fontSize);
        pdf.setTextColor(color[0], color[1], color[2]);

        const lines = pdf.splitTextToSize(text, maxWidth);
        const lineHeight = fontSize * 0.35;
        const requiredHeight = lines.length * lineHeight;

        if (y + requiredHeight > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }

        pdf.text(lines, x, y);

        return y + requiredHeight;
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
      
      pdf.setFont('helvetica', 'normal');

      // Header - Nome e Cargo
      pdf.setFontSize(28);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text('GABRIEL DA SILVA BORGES', margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(primaryFontSize);
      pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.text(resumeData.role.toUpperCase(), margin, yPosition);
      yPosition += 12;

      // Summary
      addSectionTitle(resumeData.summaryTitle, margin, yPosition);

      yPosition += 2;

      addLineSeparator(margin, yPosition, contentWidth);

      yPosition += 8;

      yPosition = addTextWithWrap(resumeData.summaryDescription, margin, yPosition, contentWidth);
      yPosition += 10;

      // Layout em duas colunas
      const leftColumnWidth = 70;
      const rightColumnWidth = contentWidth - leftColumnWidth - 10;
      const rightColumnX = margin + leftColumnWidth + 10;

      // Coluna Esquerda
      let leftY = yPosition;

      // Contato
      addSectionTitle(resumeData.contactTitle, margin, leftY);

      leftY += 2;

      addLineSeparator(margin, leftY, leftColumnWidth);

      leftY += 8;

      setSectionTextStyle();

      pdf.text(resumeData.contactPhone, margin, leftY);
      leftY += 6;

      pdf.text(resumeData.contactEmail, margin, leftY);
      leftY += 6;

      leftY = addTextWithWrap(resumeData.contactAddress, margin, leftY, leftColumnWidth);
      leftY += 10;

      // Skills
      addSectionTitle(resumeData.skillsTitle, margin, leftY);

      leftY += 2;

      addLineSeparator(margin, leftY, leftColumnWidth);

      leftY += 8;

      setSectionTextStyle();

      const skills = resumeData.skills.join('  ');

      leftY = addTextWithWrap(skills, margin, leftY, leftColumnWidth);

      leftY += 10;
      
      // Languages
      addSectionTitle(resumeData.languageSkillsTitle, margin, leftY);

      leftY += 2;

      addLineSeparator(margin, leftY, leftColumnWidth);

      leftY += 8;

      setSectionTextStyle();

      pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      resumeData.languageSkills.forEach((language: string) => {
        pdf.text(language, margin, leftY);
        leftY += 6;
      });

      leftY += 10;
      
      // Education
      addSectionTitle(resumeData.studyTitle, margin, leftY);

      leftY += 2;

      addLineSeparator(margin, leftY, leftColumnWidth);

      leftY += 8;

      setSectionTextStyle();
      
      resumeData.courses.forEach((course: any) => {
        leftY = checkPageBreak(leftY, 25); // Verificar espaço para todo o curso

        pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        leftY = addTextWithWrap(course.course, margin, leftY, leftColumnWidth, primaryColor);
        leftY += 2;

        pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        
        leftY = addTextWithWrap(course.institution, margin, leftY, leftColumnWidth);
        leftY += 2;
        leftY = addTextWithWrap(course.description, margin, leftY, leftColumnWidth);
        leftY += 2;
        leftY = addTextWithWrap(course.period, margin, leftY, leftColumnWidth);
        leftY += 6;
      });
      
      // Coluna Direita
      let rightY = yPosition;
      
      // Experiences
      addSectionTitle(resumeData.experiencesTitle, rightColumnX, rightY);

      rightY += 2;

      addLineSeparator(rightColumnX, rightY, rightColumnWidth);

      rightY += 8;

      resumeData.experiences.forEach((exp: any, index: number) => {
        rightY = checkPageBreak(rightY, 30); // Verificar espaço para toda a experiência

        // Company e Period na mesma linha
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(secondaryFontSize);
        pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.text(exp.company, rightColumnX, rightY);

        // Period alinhado à direita
        const periodWidth = pdf.getTextWidth(exp.period);

        pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        pdf.text(exp.period, rightColumnX + rightColumnWidth - periodWidth, rightY);
        rightY += 6;
        
        // Role
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(secondaryFontSize);
        pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        pdf.text(exp.role, rightColumnX, rightY);
        rightY += 6;

        setSectionTextStyle();

        // Description
        rightY = addTextWithWrap(exp.description, rightColumnX, rightY, rightColumnWidth);

        // Separador entre experiências (exceto a última)
        if (index < resumeData.experiences.length - 1) {
          rightY += 3;

          addLineSeparator(rightColumnX, rightY, rightColumnWidth, 2);

          rightY += 8;
        }
      });
      
      pdf.save('gabriel_silva_borges.pdf');
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
