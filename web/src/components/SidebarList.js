import {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  memo,
} from "react";
import Checkbox from "./Checkbox";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import SearchBox from "./SearchBox";
import "../styles/components/SidebarList.scss";
import TextWithMark from "./TextWithMark";

export const SIDEBAR_TYPE = {
  collapse: "collapse",
  checkbox: "checkbox",
};

const SidebarListContext = createContext();

function SidebarList({
  title,
  list,
  defaultSelectedItems = [],
  type = SIDEBAR_TYPE.collapse,
  hasSearch = false,
  onChange = () => {},
}) {
  const [selectedItems, setSelectedItems] = useState(defaultSelectedItems);
  const [displayList, setDisplayList] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    if (selectedItems.length === 0 && defaultSelectedItems.length > 0) {
      setSelectedItems(defaultSelectedItems);
    }
    if (selectedItems.length > 0) {
      setSelectedItems(defaultSelectedItems);
    }
  }, [defaultSelectedItems]);

  useEffect(() => {
    if (type === SIDEBAR_TYPE.collapse) {
      setDisplayList(list);
    } else {
      setDisplayList(list.slice(0, 10));
    }
  }, [list, type]);

  const handleSelectItem = (itemId) => {
    let newSelectedItems;
    switch (type) {
      case SIDEBAR_TYPE.checkbox:
        const itemIndex = selectedItems.findIndex(
          (selectedItem) => selectedItem === itemId,
        );
        newSelectedItems = selectedItems;
        if (itemIndex >= 0) {
          newSelectedItems.splice(itemIndex, 1);
        } else {
          if (itemId) {
            newSelectedItems.push(itemId);
          } else {
            newSelectedItems = [];
          }
        }
        onChange(newSelectedItems);
        setSelectedItems(newSelectedItems);
        break;
      case SIDEBAR_TYPE.collapse:
        newSelectedItems = [itemId];
        if (selectedItems[0] !== itemId) {
          onChange(newSelectedItems);
          setSelectedItems(newSelectedItems);
        }
        break;
      default:
        break;
    }
  };

  const handleChangeSearch = (event) => {
    const searchKey = event.target.value;
    const searchResult = list.filter((item) => item.content.match(searchKey));

    setDisplayList(searchResult.slice(0, 10));
    setSearchKey(searchKey);
  };

  return (
    <SidebarListContext.Provider value={{ selectedItems, handleSelectItem }}>
      <div className="sidebar-list">
        <h3 className="sidebar-list__title">{title}</h3>
        {hasSearch && (
          <SearchBox
            forceReset={selectedItems.length === 0 ? true : false}
            searchIconSize={10}
            onChange={handleChangeSearch}
            inputPlaceholder="Search for brands..."
          />
        )}
        <ul className="sidebar-list__items">
          {displayList.map((item) => {
            return (
              <li key={item.id}>
                <SidebarItem item={item} type={type} searchKey={searchKey} />
              </li>
            );
          })}
        </ul>
      </div>
    </SidebarListContext.Provider>
  );
}

function SidebarItem({ item, type = SIDEBAR_TYPE.collapse, searchKey }) {
  const { selectedItems, handleSelectItem } = useContext(SidebarListContext);
  const [isActiveNow, setActiveNow] = useState(false);
  const [isChildActive, setChildActive] = useState(false);

  const checkboxRef = useRef();

  useEffect(() => {
    if (!isChildActive.now && isChildActive.pre && selectedItems[0] === "") {
      setActiveNow(!isActiveNow);
      handleSelectItem(item.content);
    }
  }, [isChildActive]);

  useEffect(() => {
    if (type === SIDEBAR_TYPE.checkbox) {
      checkboxRef.current.checked = isActiveNow;
    }
  }, [isActiveNow]);

  useEffect(() => {
    setActiveNow(selectedItems.includes(item.content));
    setChildActive((prev) => {
      return {
        pre: prev.now,
        now: checkChildActive(),
      };
    });
  }, [selectedItems]);

  const checkChildActive = () => {
    let childActive = false;

    if (item.children) {
      const children = item.children;

      for (const child of children) {
        if (selectedItems.includes(child.content)) {
          childActive = true;
          break;
        }
      }
    }

    return childActive;
  };

  const handleSelect = (event) => {
    event.preventDefault();

    if (!isChildActive.now) {
      setActiveNow(!isActiveNow);
      handleSelectItem(item.content);
    } else {
      setChildActive((prev) => {
        return {
          pre: false,
          now: !prev.now,
        };
      });
      handleSelectItem("");
    }

    if (type === SIDEBAR_TYPE.collapse) {
      if (isActiveNow) {
        setActiveNow(!isActiveNow);
        handleSelectItem("");
      }
    }
  };

  return (
    <div
      className={`sidebar-item ${
        isActiveNow || isChildActive.now ? "sidebar-item--active" : ""
      }`}
    >
      <div className="sidebar-item__main">
        <span className="sidebar-item__prefix">
          {type === SIDEBAR_TYPE.collapse ? (
            <ChevronDownIcon />
          ) : (
            <Checkbox
              id={type + item.id}
              ref={checkboxRef}
              onCheck={handleSelect}
            />
          )}
        </span>
        <label htmlFor={type + item.id} onClick={handleSelect}>
          <span className="sidebar-item__content">
            <TextWithMark text={item.content} markText={searchKey} />
          </span>
          <span className="sidebar-item__amount">{item.amount}</span>
        </label>
      </div>
      {(isActiveNow || isChildActive.now) && item.children && (
        <ul className="sidebar-item__children">
          {item.children.map((childItem) => (
            <li key={childItem.content}>
              <SidebarItem item={childItem} type={type} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(SidebarList);
