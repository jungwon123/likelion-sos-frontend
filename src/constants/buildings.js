// 건물 타입 상수 (백엔드 BuildingType enum과 매칭)
export const BUILDING_TYPES = {
  ADMINISTRATION: 'ADMINISTRATION',
  MAIN_OFFICE: 'MAIN_OFFICE',
  INFO_TECH: 'INFO_TECH',
  NATURAL_SCIENCE: 'NATURAL_SCIENCE',
  ENGINEERING: 'ENGINEERING',
  SHARED_LAB: 'SHARED_LAB',
  DESIGN: 'DESIGN',
  HUMANITIES: 'HUMANITIES',
  SOCIAL_SCIENCE: 'SOCIAL_SCIENCE',
  CONVENTION: 'CONVENTION',
  EDUCATION: 'EDUCATION',
  SENSE: 'SENSE',
  SPORTS: 'SPORTS',
  SCHOOL_TEAM: 'SCHOOL_TEAM',
  STADIUM: 'STADIUM',
  COMPUTER: 'COMPUTER',
  ENGINEERING_2: 'ENGINEERING_2',
  AI_CONVERGENCE: 'AI_CONVERGENCE',
  WELFARE: 'WELFARE',
  DORMITORY: 'DORMITORY',
  INTERNATIONAL: 'INTERNATIONAL',
  STUDENT_CENTER: 'STUDENT_CENTER',
  LIBRARY: 'LIBRARY',
  HAKSAN: 'HAKSAN',
  LIFE: 'LIFE',
  CITY: 'CITY',
  LAB_1: 'LAB_1',
  LAB_2: 'LAB_2',
};

// 건물 타입과 한글 이름 매핑
export const BUILDING_LABELS = {
  [BUILDING_TYPES.ADMINISTRATION]: '1호관 (교수회관)',
  [BUILDING_TYPES.MAIN_OFFICE]: '2호관 (대학본부)',
  [BUILDING_TYPES.INFO_TECH]: '3호관 (정보전산원)',
  [BUILDING_TYPES.NATURAL_SCIENCE]: '5호관 (자연대)',
  [BUILDING_TYPES.ENGINEERING]: '8호관 (공대)',
  [BUILDING_TYPES.SHARED_LAB]: '9호관 (공동실험)',
  [BUILDING_TYPES.DESIGN]: '10호관 (디자인대)',
  [BUILDING_TYPES.HUMANITIES]: '14호관 (경영대)',
  [BUILDING_TYPES.SOCIAL_SCIENCE]: '15호관 (인문대)',
  [BUILDING_TYPES.CONVENTION]: '16호관 (컨벤션 센터)',
  [BUILDING_TYPES.EDUCATION]: '18호관 (사범대)',
  [BUILDING_TYPES.SENSE]: '20호관 (스센)',
  [BUILDING_TYPES.SPORTS]: '21호관 (체육관)',
  [BUILDING_TYPES.SCHOOL_TEAM]: '22호관 (학교단)',
  [BUILDING_TYPES.STADIUM]: '23호관 (강당)',
  [BUILDING_TYPES.COMPUTER]: '24호관 (정보대)',
  [BUILDING_TYPES.ENGINEERING_2]: '25호관 (공대2)',
  [BUILDING_TYPES.AI_CONVERGENCE]: '26호관 (AI융합대)',
  [BUILDING_TYPES.WELFARE]: '복지회관',
  [BUILDING_TYPES.DORMITORY]: '기숙사',
  [BUILDING_TYPES.INTERNATIONAL]: '국제교류관',
  [BUILDING_TYPES.STUDENT_CENTER]: '학생회관',
  [BUILDING_TYPES.LIBRARY]: '도서관',
  [BUILDING_TYPES.HAKSAN]: '학산도서관',
  [BUILDING_TYPES.LIFE]: '생명대',
  [BUILDING_TYPES.CITY]: '도시대',
  [BUILDING_TYPES.LAB_1]: '제1공동실험',
  [BUILDING_TYPES.LAB_2]: '제2공동실험',
};

// 건물 목록 (드롭다운에서 사용)
export const BUILDING_OPTIONS = Object.entries(BUILDING_LABELS).map(([type, label]) => ({
  type,
  label,
}));

// 건물 타입으로 라벨 조회
export const getBuildingLabel = (buildingType) => {
  return BUILDING_LABELS[buildingType] || buildingType;
};

// 건물 라벨로 타입 조회
export const getBuildingType = (buildingLabel) => {
  const entry = Object.entries(BUILDING_LABELS).find(([, label]) => label === buildingLabel);
  return entry ? entry[0] : buildingLabel;
}; 