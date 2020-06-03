import React from "react";
import { Tooltip } from "@blueprintjs/core";
import CustomizedDropdown, {
  CustomizedDropdownProps,
} from "pages/common/CustomizedDropdown";

import { Directions } from "utils/helpers";
import { RestAction } from "api/ActionAPI";
import { WidgetProps } from "widgets/BaseWidget";
import { LIGHTNING_MENU_DATA_TOOLTIP } from "constants/messages";
import { getLightningMenuOptions } from "./helpers";
import { LightningMenuTrigger } from "./LightningMenuTrigger";
import { useActions, useWidgets, usePageId } from "./hooks";
import { Theme, Skin } from "constants/DefaultTheme";
import { withTheme } from "styled-components";
import { useDispatch } from "react-redux";

const lightningMenuOptions = (
  skin: Skin,
  apis: RestAction[],
  queries: RestAction[],
  widgets: WidgetProps[],
  pageId: string,
  dispatch: Function,
  updateDynamicInputValue: (value: string, cursor?: number) => void,
  trigger: React.ReactNode,
  onCloseLightningMenu?: () => void,
): CustomizedDropdownProps => {
  const options = getLightningMenuOptions(
    apis,
    queries,
    widgets,
    pageId,
    dispatch,
    skin,
    updateDynamicInputValue,
  );
  return {
    sections: [
      {
        options,
      },
    ],
    openDirection: Directions.DOWN,
    trigger: {
      content: (
        <Tooltip hoverOpenDelay={1000} content={LIGHTNING_MENU_DATA_TOOLTIP}>
          {trigger}
        </Tooltip>
      ),
    },
    skin,
    onCloseDropDown: () => {
      if (onCloseLightningMenu) {
        onCloseLightningMenu();
      }
    },
  };
};

type LightningMenuProps = {
  isFocused: boolean;
  isOpened: boolean;
  onSelect?: (value: string) => void;
  onOpenLightningMenu: () => void;
  onCloseLightningMenu?: () => void;
  updateDynamicInputValue: (value: string, cursor?: number) => void;
  skin: Skin;
  theme: Theme;
};

export const LightningMenu = (props: LightningMenuProps) => {
  const widgets = useWidgets();
  const { apis, queries } = useActions();
  const pageId = usePageId();
  const dispatch = useDispatch();

  return (
    <CustomizedDropdown
      {...lightningMenuOptions(
        props.skin,
        apis,
        queries,
        widgets,
        pageId,
        dispatch,
        props.updateDynamicInputValue,
        <LightningMenuTrigger
          skin={props.skin}
          theme={props.theme}
          isFocused={props.isFocused}
          isOpened={props.isOpened}
          onOpenLightningMenu={props.onOpenLightningMenu}
        />,
        props.onCloseLightningMenu,
      )}
    />
  );
};

export default withTheme(LightningMenu);
