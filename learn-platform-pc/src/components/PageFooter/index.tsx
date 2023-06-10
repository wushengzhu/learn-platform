
import { IPropChild } from "@/utils/types";
import style from './index.module.less'

const PageFooter = ({ children }: IPropChild) => {
  return (
    <>
      <div style={{ height: '64px' }}>
      </div>
      <div className={style['page-footer']}>
        {children}
      </div>
    </>
  )
}

export default PageFooter;
