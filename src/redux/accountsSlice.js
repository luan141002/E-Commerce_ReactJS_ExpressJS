import { createSlice } from '@reduxjs/toolkit';

const INITIAL_ACCOUNT = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {
          memberId: null,
          firstName: null,
          lastName: null,
          email: null,
          id: null,
          roles: [],
          hasProgram: false,
          avatar: '',
      };
const EMPTY_ACCOUNT = {
    memberId: null,
    firstName: null,
    lastName: null,
    email: null,
    id: null,
    roles: [],
    hasProgram: false,
    avatar: '',
};

const accountsSlices = createSlice({
    name: 'accounts',
    initialState: INITIAL_ACCOUNT,
    reducers: {
        setAccount: (state, action) => {
            const {
                email,
                id,
                roles,
                memberId,
                firstName,
                lastName,
                hasProgram,
                avatar,
            } = action?.payload;
            console.log(email);
            state.memberId = memberId;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.id = id;
            state.roles = roles;
            state.hasProgram = hasProgram;
            state.avatar = avatar;
            localStorage.setItem('user', JSON.stringify(state));
        },
        deleteAccount: (state, action) => {
            state = EMPTY_ACCOUNT;
            localStorage.removeItem('user');
        },
        // checkAccountRole: (state, action) => {
        //     if (role.includes('.')) {
        //         const [eKind, eRole] = role.split(/\./);
        //         return (
        //             account.kind.toLowerCase() === eKind &&
        //             account.roles.some((e) => e.toLowerCase() === eRole)
        //         );
        //     } else {
        //         return account.kind.toLowerCase() === role;
        //     }
        // },
        // checkAccount: (state, action) => {
        //     if (typeof roleOrRoles === 'admin') {
        //         return checkAccountRole(account, roleOrRoles);
        //     } else {
        //         return roleOrRoles.some((e) => checkAccountRole(account, e));
        //     }
        // },
    },
});
export default accountsSlices;
