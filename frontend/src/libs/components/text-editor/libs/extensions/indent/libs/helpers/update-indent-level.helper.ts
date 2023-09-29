import { type Extensions, isList } from '@tiptap/core';
import { type Transaction } from 'prosemirror-state';
import { AllSelection, TextSelection } from 'prosemirror-state';

import { DEFAULT_OPTIONS_TYPES } from '../constants/constants.js';
import { setNodeIndentMarkup } from './set-node-indent-markup.helper.js';

const updateIndentLevel = (
  transaction: Transaction,
  delta: number,
  extensions: Extensions,
): Transaction => {
  const { doc, selection } = transaction;

  if (!doc || !selection) {
    return transaction;
  }

  if (
    !(selection instanceof TextSelection || selection instanceof AllSelection)
  ) {
    return transaction;
  }

  const { from, to } = selection;

  doc.nodesBetween(from, to, (node, position) => {
    if (DEFAULT_OPTIONS_TYPES.includes(node.type.name)) {
      transaction = setNodeIndentMarkup(transaction, position, delta);
      return false;
    }

    return !isList(node.type.name, extensions);
  });

  return transaction;
};

export { updateIndentLevel };
