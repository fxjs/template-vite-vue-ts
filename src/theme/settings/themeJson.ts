import { DataTableProps } from 'naive-ui';

/**
 * 扩展配置
 */
export const themeExtra = {
  EmptyLarge: {
    iconSizeSmall: '60px',
    iconSizeMedium: '80px',
    iconSizeLarge: '100px',
    iconSizeHuge: '120px',
  },
  Empty: {
    iconSizeSmall: '40px',
    iconSizeMedium: '60px',
    iconSizeLarge: '80px',
    iconSizeHuge: '100px',
  },
};

/**
 * 暗色组件配色
 */
export const themeDarkSetting = {
  primary: '#2199e0',
  info: '#25e6e6',
  success: '#19f576',
  warning: '#ff9c28',
  error: '#ff2f2f',
};

const textColor = '#00fefe';
const inputTextColor = '#98B9D9';
const followerColor = 'rgba(13, 39, 66, 0.96)';
const modalColor = followerColor;
const SelectionBgColor = 'rgba(4,15,26,0.3)';

export const themeDarkJson = {
  Alert: {
    color: 'rgba(0, 0, 0, 0.7)',
    colorSuccess: 'rgba(42, 148, 125, 0.5)',
    colorWarning: 'rgba(240, 138, 0, 0.5)',
    colorError: 'rgba(208, 58, 82, 0.5)',
    colorInfo: 'rgba(3, 21, 38, 0.9)',
  },
  AutoComplete: {
    peers: {
      InternalSelectMenu: {
        color: followerColor,
      },
    },
  },
  Button: {
    textColorPrimary: '#fff',
  },
  Cascader: {
    common: {
      textColor: inputTextColor,
    },
    menuColor: followerColor,
    peers: {
      InternalSelection: {
        color: SelectionBgColor,
        textColor: inputTextColor,
        border: '1px solid #2673ae',
        peers: {
          Popover: {
            color: followerColor,
          },
        },
      },
      InternalSelectMenu: {
        groupHeaderTextColor: '#98B9D9',
      },
    },
  },
  Checkbox: {
    checkMarkColor: '#fff',
  },
  DataTable: {
    borderColor: 'rgba(46, 144, 209, 0.15)',
    thColor: 'unset',
    thColorHover: 'unset',
    thTextColor: textColor,
    tdColor: 'rgba(0, 0, 0, 0)',
    tdColorStriped: 'rgba(46, 144, 209, 0.05)',
    tdColorHover: 'rgba(18, 83, 123, 0.35)',
    // in modal
    borderColorModal: 'rgba(0, 0, 0, 0)',
    tdColorModal: 'rgba(0, 0, 0, 0)',
    thColorHoverModal: 'unset',
    thColorModal: 'unset',
    thTextColorModal: textColor,
    tdColorStripedModal: 'rgba(46, 144, 209, 0.05)',
    tdColorHoverModal: 'rgba(18, 83, 123, 0.35)',
    // in popover
    borderColorPopover: 'rgba(0, 0, 0, 0)',
    tdColorPopover: 'rgba(0, 0, 0, 0)',
    thColorHoverPopover: 'unset',
    thColorPopover: 'unset',
    tdColorStripedPopover: 'rgba(46, 144, 209, 0.05)',
    tdColorHoverPopover: 'rgba(18, 83, 123, 0.35)',
    peers: {
      Ellipsis: {
        peers: {
          Tooltip: {
            color: followerColor,
            boxShadow: '0 0 10px rgba(21, 132, 195, 0.75)',
          },
        },
      },
      Empty: { ...themeExtra.EmptyLarge },
    },
  },
  DatePicker: {
    panelColor: followerColor,
    itemColorHover: '#12537b',
    itemColorDisabled: '#12537b',
    peers: {
      TimePicker: {
        panelColor: 'rgba(4, 15, 26, 0.96)',
      },
    },
  },
  Dialog: {
    color: modalColor,
    peers: {
      Button: {
        textColorError: 'rgba(255, 255, 255, 0.82)',
      },
    },
  },
  Drawer: {
    color: 'rgba(5, 25, 49, 0.9)',
    boxShadow: 'inset 0 0 15px rgba(21, 132, 195, 0.75)',
  },
  Empty: { ...themeExtra.Empty },
  Form: {
    feedbackPadding: '2px 0 4px 2px',
  },
  Input: {
    color: SelectionBgColor,
    textColor: '#98B9D9',
    border: '1px solid #2673ae',
  },
  Message: {
    color: 'rgba(0, 0, 0, 0.7)',
    colorLoading: 'rgb(72, 72, 78, 0.7)',
  },
  Popover: {
    color: followerColor,
    boxShadow: '0 0 3px rgba(21, 132, 195, 0.75)',
  },
  Select: {
    peers: {
      InternalSelection: {
        color: SelectionBgColor,
        textColor: '#98B9D9',
        border: '1px solid #2673ae',
      },
      InternalSelectMenu: {
        color: followerColor,
        optionTextColorActive: textColor,
        optionCheckColor: textColor,
      },
    },
  },
  TimePicker: {
    panelColor: followerColor,
  },
  TreeSelect: {
    menuColor: followerColor,

    peers: {
      InternalSelection: {
        color: SelectionBgColor,
        textColor: '#98B9D9',
        border: '1px solid #2673ae',
      },
    },
  },
};

/**
 * 亮色组件配色
 */
export const themeLightSetting = {
  primary: '#4570f6',
  info: '#2080f0',
  success: '#67c23a',
  warning: '#e6a23c',
  error: '#f56c6c',
};

export const themeLightJson = {
  Alert: {
    color: 'rgba(0,0,0,0.7)',
    colorSuccess: 'rgba(103,194,58,0.38)',
    colorWarning: 'rgba(230,162,60,0.38)',
    colorError: 'rgba(245,108,108,0.38)',
    colorInfo: 'rgba(144,147,153,0.9)',
  },
  DataTable: {
    thColor: '#eef1f7',
    thTextColor: '#1f2225',
    thFontWeight: 600,
    tdTextColor: '#303133',
    thColorModal: '#eef1f7',
    peers: {
      Empty: { ...themeExtra.EmptyLarge },
    },
  },
  Drawer: {
    color: '#f4f9ff',
  },
  Empty: { ...themeExtra.Empty },
  Form: {
    feedbackPadding: '2px 0 4px 2px',
  },
  Menu: {
    // bg
    itemColorHover: 'rgba(2, 73, 177, 0.1)',
    itemColorActive: 'var(--skin-c1)',
    itemColorActiveHover: 'var(--skin-c1)',
    // text
    itemTextColorHover: '#111',
    itemTextColorActive: '#fff',
    itemTextColorActiveHover: '#fff',
    // icon
    itemIconColorHover: '#333',
    itemIconColorActive: '#fff',
    itemIconColorActiveHover: '#fff',
  },
};
