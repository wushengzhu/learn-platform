export interface IPropChild {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  tel: string;
  name: string;
  desc: string;
  avatar: string;
  refetchHandler?: () => void;
  currentOrg?: string;
}
export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}
export interface IMedia {
  id: string;
  url: string;
  remark: string;
}
/**
 * 门店
 */
export interface IOrganization {
  id: string;
  orgFrontImg?: IMedia[];
  orgRoomImg?: IMedia[];
  orgOtherImg?: IMedia[];
  name: string;
  logo: string;
  tags?: string;
  description?: string;
  address?: string;
  tel?: string;
  longitude?: string;
  latitude?: string;
  identityCardBackImg:string
  identityCardFrontImg:string
  businessLicense:string
}

export type TBaseOrganization = Partial<IOrganization>;

export type TOrgsQuery = { [key: string]: { __typename?: 'Query', data: IOrganization[], page: IPage } };

export type TOrgQuery = { [key: string]: { __typename?: 'Query', data: IOrganization } };

export interface IStudent {
  name: string;
  id: string;
  tel: string;
  avatar: string;
  account: string;
}

export type TStudentQuery = { [key: string]: { __typename?: 'Query', data: IStudent[], page: IPage } };

export interface IOrderTime {
  startTime: string;
  endTime: string;
  key: number;
}

export type TWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface IWeekCourse {
  week: TWeek;
  orderTime: IOrderTime[];
}

export interface ICourse {
  id: string;
  name: string; // 标题
  desc?: string;
  group?: string; // 适龄人群
  baseAbility?: string;
  limitNumber: number; // 限制人数
  duration: number; // 持续时长
  reserveInfo?: string;
  refundInfo?: string;
  otherInfo?: string;
  reducibleTime: IWeekCourse[];
}

export type TCoursesQuery = { [key: string]: { __typename?: 'Query', data: ICourse[], page: IPage } };

export type TCourseQuery = { [key: string]: { __typename?: 'Query', data: ICourse, page: IPage } };

export type TBaseCourse = Partial<ICourse>;

export interface ICard {
  id: string;
  name: string;
  type: string;
  time: number;
  validityDay: number;
  course: ICourse;
}

export type TCardsQuery = { [key: string]: { __typename?: 'Query', data: ICard[], page: IPage } };

/**
 * 商品类型
 */
export interface IProduct {
  id: string;
  limitBuyNumber: number;
  name: string;
  coverUrl?: string;
  bannerUrl?: string;
  desc: string;
  originalPrice: number;
  stock: number;
  preferentialPrice: number;
  cards: ICard[];
}

export type TProductsQuery = { [key: string]: { __typename?: 'Query', data: IProduct[], page: IPage } };

export type TProductQuery = { [key: string]: { __typename?: 'Query', data: IProduct } };

export type TBaseProduct = Partial<IProduct>;

export interface ITeacher {
  id: string;
  name: string;
  photoUrl: string;
  teacherTime: number;
  education: string;
  seniority: string;
  experience: string;
  carryPrize: string;
  tags: string;
}

export type TBaseTeacher = Partial<ITeacher>;
export type TTeachersQuery = { [key: string]: { __typename?: 'Query', data: ITeacher[], page: IPage } };
export type TTeacherQuery = { [key: string]: { __typename?: 'Query', data: ITeacher } };
