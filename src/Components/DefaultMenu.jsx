import { menuConfig } from "./MenuItems";
import { useSelector } from "react-redux";



const DefaultMenu = (props) => {
    const user = useSelector((state) => state.auth);
    const { MenuCard} = props;

    return (

        menuConfig
            .filter((props) => props.auth === user?.userData.role[0])[0]
            .menus.map((menu, index) => (
                <MenuCard key={index} menu={menu} />
            ))
    );
};

export default DefaultMenu;
