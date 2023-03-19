import React from 'react';

import { MenuItem } from '@mui/material';

export const REPAIR_TYPE_LIST = ['شبكات', 'سوفتوير', 'هاردوير'];

export const repairTypeOptions = REPAIR_TYPE_LIST.map((option, index) => (
  <MenuItem key={index} value={option}>
    {option}
  </MenuItem>
));

export const ADMINSTRATIONS_LIST = [
  'تشغيل و صيانة',
  'صرف صناعي',
  'المالي',
  'التجاري',
];

export const adminstrationsOptions = ADMINSTRATIONS_LIST.map(
  (option, index) => (
    <MenuItem key={index} value={option}>
      {option}
    </MenuItem>
  )
);

const EMPLOYEE_TYPES_LIST = ['موظف', 'مهندس', 'أدمن'];

export const employeeOptions = EMPLOYEE_TYPES_LIST.map((option, index) => (
  <MenuItem key={index} value={option}>
    {option}
  </MenuItem>
));

const PIE_CHART_LIST = ['أنواع الأعطال', 'الإدارات'];

export const pieChartOptions = PIE_CHART_LIST.map((option, index) => (
  <MenuItem key={index} value={option}>
    {option}
  </MenuItem>
));

// IN USERS DATAGRID
export const USERS_TYPE_LIST = ['شبكات', 'سوفتوير', 'هاردوير', 'أدمن', 'موظف'];
