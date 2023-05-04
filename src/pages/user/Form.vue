<template>
  <q-page padding>
    <h1>{{ getPageTitle }}</h1>
    <q-separator class="q-my-md" />
    <q-form>
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-md-6 q-gutter-md">
          <p class="text-h6">User info</p>
          <q-input
            v-model="user.name"
            outlined
            label="Name *"
            hide-bottom-space
            lazy-rules
            :disable="routeIs.view"
            :rules="[(val) => (val && val.length > 0) || 'Digite algo']"
          />
          <q-input
            v-model="user.username"
            outlined
            label="Username *"
            hide-bottom-space
            lazy-rules
            :disable="routeIs.view"
            :rules="[(val) => (val && val.length > 0) || 'Digite algo']"
          />
          <q-input
            v-model="user.email"
            outlined
            label="Email *"
            hide-bottom-space
            lazy-rules
            :disable="routeIs.view"
            :rules="[(val) => (val && val.length > 0) || 'Digite algo']"
          />
          <q-input
            v-model="user.phone"
            outlined
            label="Phone"
            hide-bottom-space
            lazy-rules
            :disable="routeIs.view"
          />
          <q-input
            v-model="user.website"
            outlined
            label="Website"
            hide-bottom-space
            lazy-rules
            :disable="routeIs.view"
          />
        </div>
        <div class="col-xs-12 col-md-6 q-gutter-md">
          <p class="text-h6">Address</p>
          <q-input
            v-model="user.address.street"
            outlined
            label="Street *"
            hide-bottom-space
            lazy-rules
            :disable="routeIs.view"
            :rules="[(val) => (val && val.length > 0) || 'Digite algo']"
          />
          <q-input
            v-model="user.address.suite"
            outlined
            label="Address Number *"
            hide-bottom-space
            lazy-rules
            :disable="routeIs.view"
            :rules="[(val) => (val && val.length > 0) || 'Digite algo']"
          />
          <q-input
            v-model="user.address.zipcode"
            outlined
            label="Zipcode *"
            hide-bottom-space
            lazy-rules
            :disable="routeIs.view"
            :rules="[(val) => (val && val.length > 0) || 'Digite algo']"
          />
        </div>

        <div class="col-xs-12">
          <div v-if="routeIs.create || routeIs.update">
            <q-btn
              :label="routeIs.create ? 'Create' : 'Update'"
              color="primary"
              @click="formSubmit"
            />
            <q-btn
              label="Reset"
              color="accent"
              flat
              class="q-ml-md"
              @click="resetState"
            />
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import useUserService from 'src/hooks/useUserService';
import { User } from 'src/services/models';
import { defineComponent, ref, onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';

const baseState = (): User => ({
  website: '',
  username: '',
  email: '',
  id: 0,
  name: '',
  phone: '',
  address: {
    city: '',
    street: '',
    suite: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
  company: {
    bs: '',
    catchPhrase: '',
    name: '',
  },
});

export default defineComponent({
  name: 'UserForm',
  setup() {
    const $route = useRoute();
    const userId: string = $route.params.id as string;

    const { getUserById, createUser, updateUser } = useUserService();
    const user = ref<User>(baseState());

    const getPageTitle = computed(() => {
      if (routeIs.value.view) return user.value.name;
      if (routeIs.value.update) return 'Update User';
      return 'Create User';
    });

    const routeIs = computed(() => ({
      create: !!$route.meta.create,
      update: !!$route.meta.update,
      view: !!$route.meta.view,
    }));

    const getUserData = async () => {
      user.value = await getUserById(userId);
    };

    onBeforeMount(async () => {
      if (userId) {
        await getUserData();
      }
    });

    const resetState = async () => {
      if (routeIs.value.create) {
        user.value = baseState();
      }
      if (routeIs.value.update) {
        await getUserData();
      }
    };

    const formSubmit = async () => {
      if (routeIs.value.create) {
        await createUser(user);
      }
      if (routeIs.value.update) {
        await updateUser(userId, user);
      }
    };

    return {
      formSubmit,
      getPageTitle,
      resetState,
      routeIs,
      user,
      userId,
    };
  },
});
</script>
