'use client'

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const teste = t('teste')

  return (
    <>
      <h1 className='m-0'>Em Construção (Home) {teste}</h1>
    </>
  );
}
