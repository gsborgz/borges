'use client'

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import Card, { CardText, CardTitle } from "@components/ui/Card";
import Badge from "@components/ui/Badge";

export default function Home() {
  const { t } = useTranslation();

  const skills = [
    t('skills.typescript'),
    t('skills.python'),
    t('skills.nextjs'),
    t('skills.csharp'),
    t('skills.angular'),
    t('skills.mysql'),
    t('skills.react'),
    t('skills.postgres'),
  ];

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      <div className="flex items-center justify-center space-y-4 gap-8">
        <Image
          src="/borges.png"
          alt="Gabriel da Silva Borges"
          width={300}
          height={300}
          className="rounded-4xl w-50 h-50"
        />

        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">GABRIEL DA SILVA BORGES</h1>
          <p className="text-xl text-muted-foreground font-medium">{t('role')}</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6">
          <Card>
            <CardTitle>{t('contact.title')}</CardTitle>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <CardText>{t('contact.phone')}</CardText>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <CardText className="break-all">{t('contact.email')}</CardText>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <CardText className="leading-relaxed">{t('contact.address')}</CardText>
              </div>
            </div>
          </Card>

          <Card>
            <CardTitle>{t('skills.title')}</CardTitle>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle>{t('languageSkills.title')}</CardTitle>
            <div className="flex flex-col space-y-2">
              <div className="text-sm">{t('languageSkills.portuguese')}</div>
              <div className="text-sm">{t('languageSkills.english')}</div>
              <div className="text-sm">{t('languageSkills.french')}</div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardTitle>{t('summary.title')}</CardTitle>
            <CardText>{t('summary.description')}</CardText>
          </Card>
        </div>
      </div>
    </div>
  );
}
