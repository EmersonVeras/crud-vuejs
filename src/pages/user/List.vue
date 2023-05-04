<template>
  <q-page padding>
    <user-list-table :rows="users" />
  </q-page>
</template>

<script lang="ts">
import useUserService from 'src/hooks/useUserService';
import { defineComponent, defineAsyncComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'UserList',
  components: {
    UserListTable: defineAsyncComponent(
      () => import('src/components/UserListTable.vue')
    ),
  },

  setup() {
    const { getAllUsers, users } = useUserService();

    onBeforeMount(async () => {
      await getAllUsers();
    });

    return {
      getAllUsers,
      users,
    };
  },
});
</script>
