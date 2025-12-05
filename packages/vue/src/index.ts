import type { App } from "vue";
import Button from "./Button.vue";
import Input from "./Input.vue";
import Checkbox from "./Checkbox.vue";
import Container from "./Container.vue";
import Grid from "./Grid.vue";
import Stack from "./Stack.vue";
import Alert from "./Alert.vue";
import Badge from "./Badge.vue";
import Card from "./Card.vue";
import Progress from "./Progress.vue";
import Spinner from "./Spinner.vue";
import FormGroup from "./FormGroup.vue";
import Select from "./Select.vue";
import Radio from "./Radio.vue";
import Textarea from "./Textarea.vue";
import Switch from "./Switch.vue";
import Tooltip from "./Tooltip.vue";
import Tabs from "./Tabs.vue";
import Breadcrumb from "./Breadcrumb.vue";
import Dropdown from "./Dropdown.vue";
import Menu from "./Menu.vue";
import MenuItem from "./MenuItem.vue";
import MenuDivider from "./MenuDivider.vue";
import Modal from "./Modal.vue";
import Toast from "./Toast.vue";
import ToastContainer from "./ToastContainer.vue";
import Pagination from "./Pagination.vue";
import Avatar from "./Avatar.vue";
import AvatarGroup from "./AvatarGroup.vue";
import Table from "./Table.vue";
import Accordion from "./Accordion.vue";
import AccordionItem from "./AccordionItem.vue";
import Drawer from "./Drawer.vue";
import List from "./List.vue";
import ListItem from "./ListItem.vue";
import ListDivider from "./ListDivider.vue";
import Skeleton from "./Skeleton.vue";
import DataGrid from "./DataGrid.vue";
import FileUpload from "./FileUpload.vue";
import DatePicker from "./DatePicker.vue";
import TimePicker from "./TimePicker.vue";
import Slider from "./Slider.vue";
import ColorPicker from "./ColorPicker.vue";

export {
  Button,
  Input,
  Checkbox,
  Container,
  Grid,
  Stack,
  Alert,
  Badge,
  Card,
  Progress,
  Spinner,
  FormGroup,
  Select,
  Radio,
  Textarea,
  Switch,
  Tooltip,
  Tabs,
  Breadcrumb,
  Dropdown,
  Menu,
  MenuItem,
  MenuDivider,
  Modal,
  Toast,
  ToastContainer,
  Pagination,
  Avatar,
  AvatarGroup,
  Table,
  Accordion,
  AccordionItem,
  Drawer,
  List,
  ListItem,
  ListDivider,
  Skeleton,
  DataGrid,
  FileUpload,
  DatePicker,
  TimePicker,
  Slider,
  ColorPicker,
};
export type {
  ButtonProps,
  InputProps,
  CheckboxProps,
  ContainerProps,
  GridProps,
  StackProps,
  AlertProps,
  BadgeProps,
  CardProps,
  ProgressProps,
  SpinnerProps,
  FormGroupProps,
  SelectProps,
  RadioProps,
  TextareaProps,
  SwitchProps,
  TooltipProps,
  TabsProps,
  BreadcrumbProps,
  DropdownProps,
  MenuProps,
  MenuItemProps,
  MenuDividerProps,
  ModalProps,
  ToastProps,
  ToastContainerProps,
  PaginationProps,
  AvatarProps,
  AvatarGroupProps,
  TableProps,
  AccordionProps,
  AccordionItemProps,
  DrawerProps,
  ListProps,
  ListItemProps,
  ListDividerProps,
  SkeletonProps,
  DataGridProps,
  FileUploadProps,
  DatePickerProps,
  TimePickerProps,
  SliderProps,
  ColorPickerProps,
} from "./types";

// Vue plugin for installing all components
export default {
  install(app: App) {
    app.component("HaButton", Button);
    app.component("HaInput", Input);
    app.component("HaCheckbox", Checkbox);
    app.component("HaContainer", Container);
    app.component("HaGrid", Grid);
    app.component("HaStack", Stack);
    app.component("HaAlert", Alert);
    app.component("HaBadge", Badge);
    app.component("HaCard", Card);
    app.component("HaProgress", Progress);
    app.component("HaSpinner", Spinner);
    app.component("HaFormGroup", FormGroup);
    app.component("HaSelect", Select);
    app.component("HaRadio", Radio);
    app.component("HaTextarea", Textarea);
    app.component("HaSwitch", Switch);
    app.component("HaTooltip", Tooltip);
    app.component("HaTabs", Tabs);
    app.component("HaBreadcrumb", Breadcrumb);
    app.component("HaDropdown", Dropdown);
    app.component("HaMenu", Menu);
    app.component("HaMenuItem", MenuItem);
    app.component("HaMenuDivider", MenuDivider);
    app.component("HaModal", Modal);
    app.component("HaToast", Toast);
    app.component("HaToastContainer", ToastContainer);
    app.component("HaPagination", Pagination);
    app.component("HaAvatar", Avatar);
    app.component("HaAvatarGroup", AvatarGroup);
    app.component("HaTable", Table);
    app.component("HaAccordion", Accordion);
    app.component("HaAccordionItem", AccordionItem);
    app.component("HaDrawer", Drawer);
    app.component("HaList", List);
    app.component("HaListItem", ListItem);
    app.component("HaListDivider", ListDivider);
    app.component("HaSkeleton", Skeleton);
    app.component("HaDataGrid", DataGrid);
    app.component("HaFileUpload", FileUpload);
    app.component("HaDatePicker", DatePicker);
    app.component("HaTimePicker", TimePicker);
    app.component("HaSlider", Slider);
    app.component("HaColorPicker", ColorPicker);
  },
};
