export type Language = 'fa' | 'en';

export interface ContactDetails {
  nameFa: string;
  nameEn: string;
  titleFa: string;
  titleEn: string;
  phone: string;
  email: string;
  instagram: string;
  addressFa: string;
  addressEn: string;
  wazeLink: string;
  neshanLink: string;
}

export type CompanyIconType = 'gold' | 'chart' | 'bitcoin' | 'dollar' | 'lock';

export interface Company {
  nameFa: string;
  nameEn: string;
  websiteLabel: string;
  url?: string;
  descriptionFa?: string;
  descriptionEn?: string;
  iconType: CompanyIconType;
}

export interface AnimationProps {
  initial: object;
  animate: object;
  transition: object;
}