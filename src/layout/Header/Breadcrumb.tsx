import { ref, defineComponent, watch, Ref, TransitionGroup } from "vue";
import { useRoute, useRouter, RouteLocationMatched } from "vue-router";
import './Breadcrumb.scss'

export default defineComponent({
  name: "BreadCrumb",
  component: { TransitionGroup },
  setup() {
    const levelList: Ref<RouteLocationMatched[]> = ref([]);
    const route = useRoute();
    const router = useRouter();
    const getBreadcrumb = (): void => {
      let matched = route.matched.filter(item => item.meta && item.meta.title);
      const first = matched[0];
      levelList.value = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    };
    getBreadcrumb();
    watch(
      () => route.path,
      () => getBreadcrumb()
    );
    const handleLink = (event: MouseEvent, item: RouteLocationMatched): any => {
      const { redirect, path } = item;
      if(event) {
        console.log(event)
        event.preventDefault();
      }
      if (redirect) {
        router.push(redirect.toString());
        return;
      }
      router.push(path);
    };
    return () => (
      <el-breadcrumb class="app-breadcrumb hidden-sm-and-down" separator="/">
        <TransitionGroup appear name="breadcrumb">
          {levelList.value.map((item, index) => (
            <el-breadcrumb-item key={index}>
              {
                (item.redirect === 'noRedirect' || index == levelList.value.length - 1)
                  ? <span class="no-redirect">{item.meta.title}</span>
                  : <a onClick={(event) => handleLink(event,item)}> {item.meta.title} </a>
              }
            </el-breadcrumb-item>
          ))}
        </TransitionGroup>
      </el-breadcrumb>
    );
  }
});
