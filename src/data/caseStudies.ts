import { CaseStudy, CaseType, Industry, ProjectSize } from '../types';

// 使用 import.meta.glob 导入所有 config.json 文件
// 'eager: true' 会立即加载 JSON 内容，而不是返回一个动态导入函数
const configModules = import.meta.glob('./cases/*/config.json', { eager: true });

// 使用 import.meta.glob 导入所有图片文件
// 返回的是图片的 URL 路径
const imageModules = import.meta.glob('./cases/*/*.{png,jpg,jpeg,gif,svg,webp}', { eager: true, as: 'url' });

let loadedCaseStudies: CaseStudy[] = [];

// 解析导入的模块
try {
  loadedCaseStudies = Object.entries(configModules).map(([configPath, configModule]) => {
    // 从路径中提取项目 ID (文件夹名称)
    // e.g., './cases/project-1/config.json' -> 'project-1'
    const pathParts = configPath.split('/');
    const id = pathParts[pathParts.length - 2];
    const caseFolderPath = `./cases/${id}/`;

    // 类型断言，因为我们知道 eager: true 加载的是模块内容
    const config = (configModule as any).default || configModule;

    // 查找并排序与此案例相关的图片
    const caseImages = Object.entries(imageModules)
      .filter(([imagePath]) => imagePath.startsWith(caseFolderPath))
      .map(([imagePath, imageUrl]) => {
        const filename = imagePath.substring(caseFolderPath.length);
        // 提取数字前缀用于排序，假设格式为 '1.jpg', '01.png' 等
        const numericPrefixMatch = filename.match(/^(\d+)/);
        const sortKey = numericPrefixMatch ? parseInt(numericPrefixMatch[1], 10) : Infinity;
        const altText = `${config.title || 'Case image'} ${sortKey}`; // 简单的 alt 文本
        return { url: imageUrl, alt: altText, sortKey, filename };
      })
      .sort((a, b) => a.sortKey - b.sortKey);

    // 假设：
    // - 第 1 张图片 (sortKey 最小) 是缩略图 (thumbnailUrl)
    // - 第 2 张图片是主图 (heroImageUrl)
    // - 所有图片都放入 images 数组
    // 你可以在 config.json 中添加更明确的指定
    const thumbnailUrl = caseImages.find(img => img.sortKey === 1)?.url || caseImages[0]?.url || '/placeholder-thumbnail.jpg'; // 提供备用
    const heroImageUrl = caseImages.find(img => img.sortKey === 2)?.url || caseImages[1]?.url || thumbnailUrl; // 提供备用

    // 构建 CaseStudy 对象
    const caseStudy: CaseStudy = {
      // 从 config.json 读取
      id: config.id || id, // 优先使用 config.json 中的 id
      title: config.title || 'Untitled Case',
      client: config.client || 'Unknown Client',
      industry: config.industry as Industry || 'Technology', // 需要确保类型安全
      type: config.type as CaseType[] || [],
      projectSize: config.projectSize as ProjectSize || 'Medium',
      year: config.year || new Date().getFullYear(),
      description: config.description || '',
      tags: config.tags || [],
      featured: config.featured || false,
      content: config.content || [],
      // 从扫描到的图片构建
      thumbnailUrl: thumbnailUrl,
      heroImageUrl: heroImageUrl,
      images: caseImages.map(img => ({
        url: img.url,
        alt: img.alt,
        // 假设 config.json 不包含宽高，可以后续添加或动态获取
        width: config.imageDimensions?.[img.filename]?.width || 1200,
        height: config.imageDimensions?.[img.filename]?.height || 800,
      })),
    };
    return caseStudy;
  });

  // 可选：按年份或其他标准排序
  loadedCaseStudies.sort((a, b) => b.year - a.year);

} catch (error) {
  console.error("Error loading case studies:", error);
  loadedCaseStudies = []; // 出错时返回空数组
}

// 导出加载的数据和相关函数
export const caseStudies: CaseStudy[] = loadedCaseStudies;

export const getAllCaseStudies = (): CaseStudy[] => {
  return caseStudies;
};

export const getFeaturedCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter(caseStudy => caseStudy.featured);
};

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudies.find(caseStudy => caseStudy.id === id);
};

export const filterCaseStudies = (
  industries: string[] = [],
  types: string[] = [],
  projectSizes: string[] = []
): CaseStudy[] => {
  return caseStudies.filter(caseStudy => {
    const matchesIndustry = industries.length === 0 || industries.includes(caseStudy.industry);
    const matchesType = types.length === 0 || caseStudy.type.some(t => types.includes(t));
    const matchesSize = projectSizes.length === 0 || projectSizes.includes(caseStudy.projectSize);

    return matchesIndustry && matchesType && matchesSize;
  });
};
