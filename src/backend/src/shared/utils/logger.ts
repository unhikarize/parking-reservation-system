export const logger = {
  info: (message: string) => console.info(message),
  error: (error: unknown) => {
    if (error instanceof Error) {
      console.error(error.stack ?? error.message);
    } else {
      console.error(error);
    }
  },
};
