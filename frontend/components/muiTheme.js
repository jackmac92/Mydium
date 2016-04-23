import * as ColorManipulator from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';
import * as Colors from 'material-ui/styles/colors';


export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  baseTheme: {
    fontFamily: 'Roboto, sans-serif'
  },
  
  palette: {
    primary1Color: Colors.blue500,
    primary2Color: Colors.blue700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.yellowA500,
    accent2Color: Colors.yellowA100,
    accent3Color: Colors.yellowA900,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500,
  }
};