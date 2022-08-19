const deckKeys = {
  pile: () => "pile",
  preview: () => "preview",
  goal: (name) => `goals.${name}`,
  columns: (index) => `columns.${index}`,
};

export default deckKeys;
