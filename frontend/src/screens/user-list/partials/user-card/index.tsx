import { Body, Card, Center, InputChecked, Subtitle, Title } from "../../styles"
import Colors from '../../../../helpers/color';
import { FC, useMemo } from "react";
import { Avatar } from "antd";
import { IUser } from "../../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface ICard extends IUser {
  onEdit: (user: IUser) => void
  onDelete: (userName?: string) => void
}

const Component:FC<ICard> = (props) => {
  const {
    username,
    firstname,
    lastname
  } = props;

  const colorBg = useMemo(() => {
    return Colors.Random()
  }, [])
  return (
    <Card key={props?.user_id} $active>
      <Center>
        <InputChecked type="checkbox" />
      </Center>
      <Center>
        <Avatar style={{ backgroundColor: colorBg }} size="large">
          {props?.firstname?.split('')[0]?.toUpperCase()}
        </Avatar>
      </Center>
      <Body>
        <Title>{props?.username}</Title>
        <Subtitle>{props?.firstname} {props?.lastname}</Subtitle>
      </Body>
      <Center $gap="10px">
        <EditOutlined
          onClick={() => props?.onEdit({
            username,
            firstname,
            lastname
          })}
          style={{ cursor: 'pointer' }}
          size={26}
        />
        <DeleteOutlined
          onClick={() => props?.onDelete(username)}
          style={{ cursor: 'pointer' }}
          size={26}
        />
      </Center>
    </Card>
  )
}

export default Component;
