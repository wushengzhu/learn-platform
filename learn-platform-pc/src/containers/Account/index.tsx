import { useUserContext } from "@/hooks/useHooks";
import { useTitle } from "@/hooks/useTitle";
import { MobileOutlined, UserOutlined, WindowsOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import User from "../../components/User";
import { ReactNode } from "react";
import Student from "../../components/Student";
import Teacher from "@/components/Teacher";

const Account = () => {
  const { store } = useUserContext();
  const mobileUser: ReactNode = (
    <Tabs
      tabPosition={'left'}
      items={[{ title: '学员管理', icon: UserOutlined }, { title: '教师管理', icon: UserOutlined }].map((item, i) => {

        return {
          label: (
            <span>
              <item.icon rev={undefined} />
              {item.title}
            </span>
          ),
          key: i + '',
          children: i === 0 ? <Student /> : <Teacher />,
        };
      })}
    />
  )

  return (
    <Tabs
      defaultActiveKey="0"
      items={[{ title: '管理端', icon: WindowsOutlined }, { title: '移动端', icon: MobileOutlined }].map((item, i) => {

        return {
          label: (
            <span>
              <item.icon rev={undefined} />
              {item.title}
            </span>
          ),
          key: i + '',
          children: i === 0 ? <User /> : mobileUser,
        };
      })}
    />
  )
}

export default Account;
