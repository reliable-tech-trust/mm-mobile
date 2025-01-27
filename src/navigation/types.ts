import {IPost} from '@screens/Bottom/Home/components/Articles/types';
import routes from './routes';

export type RootStackParamList = {
  [routes.BOTTOM_TAB]: undefined;
  [routes.LOGIN_SCREEN]: undefined;
  [routes.LOGIN_VERIFY_SCREEN]: undefined;
  [routes.REGISTER_STEP1_SCREEN]: undefined;
  [routes.REGISTER_STEP2_SCREEN]: undefined;
  [routes.REGISTER_STEP3_SCREEN]: undefined;
  [routes.REGISTER_STEP4_SCREEN]: undefined;
  [routes.REGISTER_STEP5_SCREEN]: undefined;
  [routes.FORGOT_PASSWORD_STEP1_SCREEN]: undefined;
  [routes.FORGOT_PASSWORD_STEP2_SCREEN]: undefined;
  [routes.FORGOT_PASSWORD_STEP3_SCREEN]: undefined;
  [routes.FORGOT_PASSWORD_STEP4_SCREEN]: undefined;
  [routes.LOGIN_ISSUE_STEP1_SCREEN]: undefined;
  [routes.LOGIN_ISSUE_STEP2_SCREEN]: undefined;
  [routes.LOGIN_ISSUE_STEP3_SCREEN]: undefined;
  [routes.LOGIN_ISSUE_STEP4_SCREEN]: undefined;
  [routes.ARTICLE_DETAILS_SCREEN]: {details: IPost};
  [routes.ARTICLE_VIEWED_SCREEN]: undefined;
  [routes.MILESTONE_DETAILS_SCREEN]: undefined;
  [routes.EDIT_PROFILE_SCREEN]: undefined;
  [routes.GADGETS_CUSTOMIZATION_SCREEN]: undefined;
  [routes.CREATE_MILESTONE_SCREEN]: undefined;
  [routes.EDIT_MILESTONE_SCREEN]: {milestoneId: string};
  [routes.SUGGEST_SCREEN]: undefined;
  [routes.FEEDBACK_SUBMIT_SCREEN]: undefined;
  [routes.CREATE_MOMENT_SCREEN]: {milestoneId?: string};
  [routes.EDIT_MOMENT_SCREEN]: {momentId: string};
  [routes.RECALL_SCREEN]: {momentIdx?: number};
  [routes.ACTIVITY_DETAILS_SCREEN]: {momentIdx: number};
  [routes.MOMENT_DETAILS_SCREEN]: {momentId: string};
  [routes.MOMENT_FULL_SCREEN]: {item: any; STORY_WIDTH: number; STORY_HEIGHT: number};
  
  [routes.HOME_SCREEN]: undefined;
  [routes.GADGETS_SCREEN]: undefined;
  [routes.GADGETS_APPS_SCREEN]: undefined;
  [routes.GADGETS_MOOD_HISTORY_SCREEN]: undefined;
  [routes.GADGETS_FEEDBACK_SCREEN]: undefined;
  [routes.GADGETS_FAQ_SCREEN]: undefined;
  [routes.GADGETS_PRIVACY_SCREEN]: undefined;
  [routes.GADGETS_DATA_PROTECTION_SCREEN]: undefined;
  [routes.REGISTER_STEP1_SCREEN]: undefined;

};
