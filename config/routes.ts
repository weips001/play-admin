export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/place',
              },
              // {
              //   path: '/welcome',
              //   name: '欢迎登录',
              //   icon: 'smile',
              //   authority: 'welcome',
              //   component: './Welcome',
              // },
              // {
              //   path: '/analysis',
              //   name: '数据分析',
              //   icon: 'smile',
              //   // authority: 'welcome',
              //   component: './Analysis',
              // },
              // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   component: './Admin',
              //   routes: [
              //     {
              //       path: '/admin/sub-page',
              //       name: 'sub-page',
              //       icon: 'smile',
              //       component: './Welcome',
              //     },
              //   ],
              // },
              // {
              //   name: '公司管理',
              //   icon: 'table',
              //   path: '/company',
              //   authority: 'company',
              //   component: './Company',
              // },
              {
                name: '畅玩消费',
                icon: 'table',
                path: '/consume',
                // authority: 'consume',
                component: '../layouts/BlankLayout',
                routes: [
                  {
                    path: '/consume/tao',
                    name: '淘气堡',
                    authority: 'consume-tao',
                    icon: 'smile',
                    component: './Consume',
                  },
                ]
              },
              {
                name: '充值记录',
                icon: 'table',
                path: '/recharge-record',
                // authority: 'consume',
                component: '../layouts/BlankLayout',
                routes: [
                  {
                    path: '/recharge-record/tao',
                    authority: 'rechargeRecord-tao',
                    name: '淘气堡',
                    icon: 'smile',
                    component: './TaoRecharge',
                  },
                ]
              }, 
              {
                name: '消费记录',
                icon: 'table',
                path: '/consume-record',
                component: '../layouts/BlankLayout',
                routes: [
                  {
                    path: '/consume-record/tao',
                    authority: 'consumeRecord-tao',
                    name: '淘气堡',
                    icon: 'smile',
                    component: './ConsumeRecord',
                  },
                ]
              },
              {
                name: '会员信息',
                icon: 'table',
                path: '/vip',
                // authority: 'consume',
                component: './Vip',
              },
              // {
              //   name: '淘气包会员',
              //   icon: 'table',
              //   path: '/vip',
              //   // authority: 'consume',
              //   component: './Vip',
              // },
              // {
              //   name: '淘气包充值记录',
              //   icon: 'table',
              //   path: '/pay-record',
              //   // authority: 'consume',
              //   component: './PayRecord',
              // },
              // {
              //   name: '淘气包消费记录',
              //   icon: 'table',
              //   path: '/consume-record',
              //   // authority: 'consume',
              //   component: './ConsumeRecord',
              // },
              // {
              //   name: '游戏币会员',
              //   icon: 'table',
              //   path: '/game-vip',
              //   // authority: 'consume',
              //   component: './GameVip',
              // },
              // {
              //   name: '游戏币充值记录',
              //   icon: 'table',
              //   path: '/gamebi-record',
              //   // authority: 'consume',
              //   component: './GameVipRecord',
              // },
              // {
              //   name: '游戏币消费记录',
              //   icon: 'table',
              //   path: '/gamebiconsume-record',
              //   // authority: 'consume',
              //   component: './GameConsumeRecord',
              // },
              // {
              //   name: '付款申请单',
              //   icon: 'table',
              //   path: '/payment-order',
              //   authority: 'paymentOrder',
              //   component: './PaymentOrder/list',
              // },
              // {
              //   name: '付款申请单',
              //   icon: 'table',
              //   path: '/payment-order',
              //   component: './PaymentOrder',
              //   hideInMenu: true,
              //   routes: [
              //     {
              //       path: '/payment-order/create',
              //       name: '创建',
              //       icon: 'smile',
              //       hideInMenu: true,
              //       component: './PaymentOrder/order/create',
              //     },
              //     {
              //       path: '/payment-order/update/:id',
              //       name: '编辑',
              //       icon: 'smile',
              //       hideInMenu: true,
              //       component: './PaymentOrder/order/update',
              //     }
              //   ]
              // },
              // {
              //   name: '发票管理',
              //   icon: 'table',
              //   path: '/bill',
              //   authority: 'bill',
              //   component: './Bill',
              // },
              {
                name: '场地管理',
                icon: 'table',
                path: '/place',
                authority: 'place',
                component: './Place',
              },
              {
                name: '权限管理',
                icon: 'table',
                component: '../layouts/BlankLayout',
                routes: [
                  {
                    name: '人员管理',
                    icon: 'table',
                    path: '/user-list',
                    authority: 'user',
                    component: './User/list',
                  },
                  {
                    name: '權限管理',
                    icon: 'table',
                    path: '/user-auth',
                    authority: 'auth',
                    component: './User/auth',
                  },
                  {
                    name: '角色管理',
                    icon: 'table',
                    path: '/user-role',
                    authority: 'role',
                    component: './User/role',
                  },
                ],
              },

              // {
              //   name: '角色管理',
              //   icon: 'table',
              //   path: '/role',
              //   authority: 'role',
              //   component: './Role',
              // },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
