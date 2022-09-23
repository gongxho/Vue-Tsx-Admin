import { defineComponent } from 'vue';
import {RouterLink, RouterView} from 'vue-router';
import '/@/style/main.scss'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <RouterView/>
      </>
    );
  }
});