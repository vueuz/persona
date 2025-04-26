export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: Industry;
  type: CaseType[];
  projectSize: ProjectSize;
  year: number;
  thumbnailUrl: string;
  heroImageUrl: string;
  description: string;
  tags: string[];
  featured: boolean;
  images: {
    url: string;
    alt: string;
    width: number;
    height: number;
  }[];
  content?: {
    heading?: string;
    text?: string;
    imageUrl?: string;
    imageAlt?: string;
  }[];
}

export type Industry =
  | '科技'
  | '医疗'
  | '销售'
  | '金融'
  | '教育'
  | '建筑'
  | '娱乐'
  | '文化'
  | '公益' // 添加 '公益'
  | '农业' // 添加 '农业'
  | '食品' // 添加 '食品'
  | '工业' // 添加 '文具'
  | '其他';

export type CaseType =
  | '商业计划书'
  | '方案策划'
  | '品牌宣传'
  | '市场调研'
  | '数字营销'
  | '品牌识别' // 替换 Brand Identity
  | '演示设计' // 替换 Presentation Design
  | '包装设计' // 替换 Packaging
  | '印刷品设计' // 替换 Print
  | '融资咨询';


export type ProjectSize = '小型' | '中型' | '大型' | 'N/A'; // 可以翻译

export interface FilterState {
  industries: Industry[];
  types: CaseType[];
  projectSizes: ProjectSize[];
}
