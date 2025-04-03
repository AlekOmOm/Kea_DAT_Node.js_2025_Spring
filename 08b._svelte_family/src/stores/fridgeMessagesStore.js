import { writable } from "svelte/store";

function fridgeMessagesStore() {
  const { set, update, subscribe } = writable([
    { message: "Svelte Family Fridge" },
  ]);

  return {
    subscribe,
    addMessage: (fridgeMessageInput, creator) =>
      update((messages) => [
        ...messages,
        {
          creator: creator.name,
          message: fridgeMessageInput,
          date: new Date().toLocaleString(),
        },
      ]),
    wipe: () => set([{ message: "Svelte Family Fridge" }]),
  };
}

export const fridgeMessages = fridgeMessagesStore();
