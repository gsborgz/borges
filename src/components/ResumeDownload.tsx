'use client'

import { CloudDownload } from 'lucide-react';
import { CSSProperties, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@components/ui/Button';
import { ResumeData, useResume } from '@hooks/useResume';
import { useTranslation } from 'react-i18next';

export function ResumeDownload() {
  const { t } = useTranslation();
  const resumeData = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (!resumeRef.current) return;

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        width: resumeRef.current.scrollWidth,
        height: resumeRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight > 297) {
        const scaleFactor = 297 / imgHeight;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * scaleFactor, 297);
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }
      
      pdf.save('gabriel_silva_borges.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

  return (
    <>
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

      <HiddenResumeRender resumeData={resumeData} resumeRef={resumeRef} />
    </>
  );
}

function HiddenResumeRender({ resumeData, resumeRef }: { resumeData: ResumeData, resumeRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div 
      ref={resumeRef} 
      style={{ 
        position: 'absolute',
        left: '-9999px',
        top: '0',
        width: '794px', // Largura fixa em pixels (equivalente a 210mm)
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        paddingTop: '50px',
        paddingRight: '80px',
        paddingLeft: '80px',
        color: '#334155',
        fontSize: '14px',
        lineHeight: '1.5',
        boxSizing: 'border-box' // Incluir padding no cálculo da largura
      }}
    >
      <ResumePDFVersion data={resumeData} />
    </div>
  );
}

function ResumePDFVersion({ data }: { data: ResumeData }) {
  const {
    skills,
    languageSkills,
    experiences,
    courses,
    role,
    skillsTitle,
    languageSkillsTitle,
    contactTitle,
    contactPhone,
    contactEmail,
    contactAddress,
    studyTitle,
    summaryTitle,
    summaryDescription,
    experiencesTitle
  } = data;
  const sectionSpacing = '20px';
  const primaryTextSize = '16px';
  const secondaryTextSize = '14px';
  const normalTextSize = '13px';
  const containerStyle: CSSProperties = { 
    width: '100%', 
    margin: '0',
    padding: '0',
    backgroundColor: '#ffffff',
    color: '#334155',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    lineHeight: '1.6',
    boxSizing: 'border-box'
  };
  const nameStyle: CSSProperties = {
    color: '#0f172b',
    fontSize: '36px', 
    letterSpacing: '1px',
    textTransform: 'uppercase'
  };
  const roleStyle: CSSProperties = { 
    color: '#45556c',
    fontSize: primaryTextSize,
    letterSpacing: '1px',
    fontWeight: '500'
  };
  const sectionTitleStyle: CSSProperties = { 
    color: '#0f172b',
    fontSize: primaryTextSize,
    marginBottom: '10px',
    textTransform: 'uppercase',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '6px',
    letterSpacing: '1px',
  };
  const sectionSecondaryTitleStyle: CSSProperties = {
    color: '#0f172b',
    fontSize: secondaryTextSize,
    marginBottom: '8px',
    letterSpacing: '1px',
  };
  const sectionTextStyle: CSSProperties = { 
    color: '#45556c',
    margin: '0', 
    fontSize: normalTextSize,
    lineHeight: '1.6',
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ textAlign: 'start', marginBottom: sectionSpacing }}>
        <h1 style={nameStyle}>
          GABRIEL DA SILVA BORGES
        </h1>
        <p style={roleStyle}>
          {role.toLocaleUpperCase()}
        </p>
      </div>

      {/* Main Content */}
      <div>
        {/* Summary */}
        <div style={{ marginBottom: sectionSpacing }}>
          <h2 style={sectionTitleStyle}>
            {summaryTitle}
          </h2>
          <p style={sectionTextStyle}>
            {summaryDescription}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px' }}>
          {/* Left Column */}
          <div style={{ paddingRight: '0' }}>
            {/* Contact */}
            <div style={{ marginBottom: sectionSpacing }}>
              <h2 style={sectionTitleStyle}>
                {contactTitle}
              </h2>
              <div style={sectionTextStyle}>
                <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '6px' }}>📞</span>
                  {contactPhone}
                </p>
                <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '6px' }}>✉️</span>
                  {contactEmail}
                </p>
                <p style={{ margin: '4px 0', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ marginRight: '6px', marginTop: '1px' }}>📍</span>
                  {contactAddress}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: sectionSpacing }}>
              <h2 style={sectionTitleStyle}>
                {skillsTitle}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((skill: string, index: number) => (
                  <span key={index} style={sectionTextStyle}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div style={{ marginBottom: sectionSpacing }}>
              <h2 style={sectionTitleStyle}>
                {languageSkillsTitle}
              </h2>
              <div>
                {languageSkills.map((language: string, index: number) => (
                  <p key={index} style={sectionTextStyle}>
                    {language}
                  </p>
                ))}
              </div>
            </div>

            {/* Education */}
            <div style={{ marginBottom: sectionSpacing }}>
              <h2 style={sectionTitleStyle}>
                {studyTitle}
              </h2>
              {courses.map((course: any, index: number) => (
                <div key={index} style={{ marginBottom: '12px', fontSize: '11px' }}>
                  <h3 style={sectionSecondaryTitleStyle}>
                    {course.institution}
                  </h3>
                  <p style={sectionTextStyle}>
                    {course.course}
                  </p>
                  <p style={sectionTextStyle}>
                    {course.description}
                  </p>
                  <span style={sectionTextStyle}>
                    {course.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div style={{ minWidth: '0' }}> {/* Permite que o conteúdo se ajuste */}
            {/* Experience */}
            <div>
              <h2 style={sectionTitleStyle}>
                {experiencesTitle}
              </h2>
              
              {experiences.map((exp: any, index: number) => (
                <div key={index} style={{ 
                  marginBottom: index < experiences.length - 1 ? '8px' : '0',
                  paddingBottom: index < experiences.length - 1 ? '15px' : '0',
                  borderBottom: index < experiences.length - 1 ? '1px solid #f1f5f9' : 'none'
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <span style={sectionSecondaryTitleStyle}>
                      {exp.company}
                    </span>
                    <span style={{ ...sectionSecondaryTitleStyle, color: sectionTextStyle.color }}>
                      {exp.period}
                    </span>
                  </div>
                  <p style={{ ...sectionTextStyle, marginBottom: '8px' }}>
                    {exp.role}
                  </p>
                  <p style={sectionTextStyle}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
