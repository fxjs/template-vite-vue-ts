// import { DataTableProps } from 'naive-ui';
// import { SelectProps } from 'naive-ui';
// import { CascaderProps } from 'naive-ui';
// import { DatePickerProps } from 'naive-ui';
// import { TimePickerProps } from 'naive-ui';
// import { TreeSelectProps } from 'naive-ui';
// import { ButtonProps } from 'naive-ui';
// import { DialogProps } from 'naive-ui';
// import { PopoverProps } from 'naive-ui';
// import { DrawerProps } from 'naive-ui';
// import { DataTableProps } from 'naive-ui';

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
const SelectionBgColor = 'rgba(4,15,26,0.9)';

export const themeDarkJson = {
  Alert: {
    color: 'rgba(0, 0, 0, 0.7)',
    colorSuccess: 'rgba(42, 148, 125, 0.5)',
    colorWarning: 'rgba(240, 138, 0, 0.5)',
    colorError: 'rgba(208, 58, 82, 0.5)',
    colorInfo: 'rgba(3, 21, 38, 0.9)',
  },
  Button: {
    fontSizeMedium: '16px',
    paddingMedium: '0 24px',
    fontSizeLarge: '18px',
    paddingLarge: '0 30px',
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
    thColorModal: 'unset',
    thColorHoverModal: 'unset',
    thTextColorModal: textColor,
    tdColorModal: 'rgba(0, 0, 0, 0)',
    tdColorStripedModal: 'rgba(46, 144, 209, 0.05)',
    tdColorHoverModal: 'rgba(18, 83, 123, 0.35)',
    peers: {
      Ellipsis: {
        peers: {
          Tooltip: {
            color: followerColor,
            boxShadow: '0 0 10px rgba(21, 132, 195, 0.75)',
          },
        },
      },
      // Empty: {
      //   iconSizeMedium: '100px',
      // },
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
  },
  Drawer: {
    color: 'rgba(5, 25, 49, 0.9)',
    boxShadow: 'inset 0 0 15px rgba(21, 132, 195, 0.75)',
  },
  Empty: {
    iconSizeSmall: '40px',
    iconSizeMedium: '80px',
    iconSizeLarge: '120px',
    iconSizeHuge: '160px',
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
  primary: '#0249b1',
  info: '#909399',
  success: '#67c23a',
  warning: '#e6a23c',
  error: '#f56c6c',
};

export const themeLightExtra = {
  EmptyLarge: {
    iconSizeSmall: '76px',
    iconSizeMedium: '86px',
    iconSizeLarge: '96px',
    iconSizeHuge: '106px',
  },
};

export const themeLightJson = {
  Alert: {
    color: 'rgba(0,0,0,0.7)',
    colorSuccess: 'rgba(103,194,58,0.38)',
    colorWarning: 'rgba(230,162,60,0.38)',
    colorError: 'rgba(245,108,108,0.38)',
    colorInfo: 'rgba(144,147,153,0.9)',
  },
  Drawer: {
    color: '#f4f9ff',
  },
  DataTable: {
    thColor: '#dce8f7',
    thTextColor: '#1f2225',
    thFontWeight: 600,
    tdTextColor: '#303133',
    thColorModal: '#dce8f7',
    peers: {
      Empty: { ...themeLightExtra.EmptyLarge },
    },
  },
  Empty: {
    textColor: 'rgba(96,98,102,0.6)',
    iconSizeSmall: '46px',
    iconSizeMedium: '56px',
    iconSizeLarge: '66px',
    iconSizeHuge: '76px',
  },
  Menu: {
    // bg
    itemColorHover: 'rgba(2, 73, 177, 0.1)',
    itemColorActive: 'var(--com-primary-color)',
    itemColorActiveHover: 'var(--com-primary-color)',
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
