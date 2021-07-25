import _ from 'lodash';
import { boot } from 'quasar/wrappers';
import { openURL, useQuasar, colors } from 'quasar';

export default boot(async ({ app, router, store, urlPath, publicPath, redirect }) => {

    //全局路由前置，检查认证状态
    router.beforeEach((to, from, next) => {
    });
});
