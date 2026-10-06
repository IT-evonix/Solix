export interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    label: "About",
    children: [
      {
        label: "About IMSCDR",
        href: "/about-imscdr",
      },
      {
        label: "Leadership",
        children: [
          {
            label: "Chairman",
            href: "/leadership/chairman",
          },
          {
            label: "Director",
            href: "/leadership/director",
          },
          {
            label: "Dean",
            href: "/leadership/dean",
          },
        ],
      },
      {
        label: "Vision & Mission",
        href: "/vision-mission",
      },
    ],
  },

  {
    label: "Programs",
    children: [
      {
        label: "MBA",
        href: "/mba",
      },
      {
        label: "BBA",
        href: "/bba",
      },
    ],
  },

  {
    label: "Admissions",
    href: "/admissions",
  },

  {
    label: "Placements",
    href: "/placements",
  },

  {
    label: "Faculty & Research",
    href: "/faculty-and-research",
  },
  {
    label: "Student Corner",
    href: "/student-corner",
  },
  {
    label: "Governance",
    href: "/governance",
  },
  {
    label: "News & Media",
    href: "/news-and-media",
  },
  // {
  //   label: "Contact",
  //   href: "/contact",
  // },
];





