import Users from 'src/services/Users';
import { User } from 'src/services/models';
import { ref } from 'vue';

const UsersService = new Users();

const users = ref<User[]>([]);

const getAllUsers = async () => {
  const tmpUsers = await UsersService.getAll();

  users.value = [...tmpUsers];
  return tmpUsers;
};

const getUserById = async (id: string) => UsersService.getById(id);

const createUser = async (user: User) => UsersService.create(user);

const updateUser = async (id: string, newUserData: User) =>
  UsersService.update(id, newUserData);

const deleteUser = async (id: string) => UsersService.delete(id);

export default () => ({
  users,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
});
