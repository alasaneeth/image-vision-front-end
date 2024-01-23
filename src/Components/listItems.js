import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import DefaultMenu from "./DefaultMenu";

import { SecondaryMenu } from "./MenuItems";

export const MainListItems = () => {
  const user = useSelector((state) => state.auth);

  const ChildrenListItems = ({ menu }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <div onClick={() => setOpen(!open)}>
          <ListItem button>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.label} />
            {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
          </ListItem>
        </div>
        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
          {menu.children.map((children, index) => (
            <MenuCard menu={children} key={index} />
          ))}
        </Collapse>
      </React.Fragment>
    );
  };

  const MenuCard = ({ menu }) => {
    return (
      <div>
        {menu.children.length === 0 ? (
          <NavLink to={menu.path} activeClassName="active-nav" exact>
            <ListItem button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          </NavLink>
        ) : (
          <ChildrenListItems menu={menu} />
        )}
      </div>
    );
  };

  return (
    <>
      <DefaultMenu MenuCard={MenuCard}/>
    </>
  );
};

export const SubListItems = () => {
  const ChildrenListItems = ({ menu }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <div
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ListItem button>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.label} />
            {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
          </ListItem>
        </div>
        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
          {menu.children.map((children, index) => (
            <NavLink
              key={index}
              to={children.path}
              activeClassName="active-nav"
              exact
              onClick={() => {
                setOpen(!open);
              }}
            >
              <ListItem button style={{ paddingLeft: 30 }}>
                <ListItemIcon>{children.icon}</ListItemIcon>
                <ListItemText primary={children.label} />
              </ListItem>
            </NavLink>
          ))}
        </Collapse>
      </>
    );
  };
  return (
    <>
      {SecondaryMenu.map((menu, index) => (
        <div key={index}>
          {menu.children.length === 0 ? (
            <NavLink to={menu.path} activeClassName="active-nav" exact>
              <ListItem button>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            </NavLink>
          ) : (
            <ChildrenListItems menu={menu} />
          )}
        </div>
      ))}
    </>
  );
};
