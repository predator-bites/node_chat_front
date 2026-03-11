export const storageManager = {
  setUser: (userId: string, userName: string) => {
    try {
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
    } catch (error) {
      console.error('Failed to save data', error);
    }
  },
  getUser: () => {
    try {
      return {
        userId: localStorage.getItem('userId'),
        userName: localStorage.getItem('userName'),
      }
    } catch (error) {
      console.error('Failed to get user data: ', error);

      return {
        userId: null,
        userName: null,
      };
    }
  },
  cleanUser: () => {
    try {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');

      return true;
    } catch (error) {
      console.log('Failed to clean user data: ', error);
      return false;
    }
  },
};
