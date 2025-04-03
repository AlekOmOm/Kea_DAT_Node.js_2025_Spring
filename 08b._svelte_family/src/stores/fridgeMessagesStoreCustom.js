import { writable } from "svelte/store";

export function fridgeMessages() {
  const { set, update, subscribe } = writable([
    { message: "Svelte Family Fridge" },
  ]);

  return {
    subscribe,
    addMessage: (message) => update((messages) => [...messages, { message }]),
    clearMessages: () => set([]),
  };
}
export const fridgeMessagesStore = fridgeMessages();
