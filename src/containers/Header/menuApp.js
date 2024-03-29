export const adminMenu = [
  // User manage
  {
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/manage-doctor',
        // subMenus: [
        //   {
        //     name: 'menu.system.system-administrator.user-manage',
        //     link: '/system/user-manage',
        //   },
        //   {
        //     name: 'menu.system.system-administrator.user-redux',
        //     link: '/system/user-redux',
        //   },
        // ],
      },
      {
        name: 'menu.doctor.manage-schedule',
        link: '/system/manage-doctor-schedule',
      },
      {
        name: 'menu.admin.crud',
        link: '/system/user-manage',
      },
      {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux',
      },
    ],
  },
  // Clinic manage
  {
    name: 'menu.admin.clinic',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/manage-clinic',
      },
    ],
  },
  // Specialty manage
  {
    name: 'menu.admin.specialty',
    menus: [
      {
        name: 'menu.admin.manage-specialty',
        link: '/system/manage-specialty',
      },
    ],
  },
  // Handbook
  {
    name: 'menu.admin.handbook',
    menus: [
      {
        name: 'menu.admin.manage-handbook',
        link: '/system/manage-handbook',
      },
    ],
  },
]

export const doctorMenu = [
  {
    name: 'menu.doctor.manage-user',
    menus: [
      {
        name: 'menu.doctor.manage-schedule',
        link: '/system/manage-doctor-schedule',
      },
      {
        name: 'menu.doctor.manage-patient',
        link: '/system/manage-patient',
      },
    ],
  },
]
