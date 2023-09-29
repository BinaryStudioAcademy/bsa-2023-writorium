import { type Transaction } from 'prosemirror-state';

import { DEFAULT_INDENT_LEVEL } from '../constants/default-indent-level.constant.js';
import { IndentProperty } from '../enums/enums.js';
import { type NodeAttributesIndent } from '../types/types.js';

const setNodeIndentMarkup = (
  transaction: Transaction,
  position: number,
  delta: number,
): Transaction => {
  if (!transaction.doc) {
    return transaction;
  }

  const node = transaction.doc.nodeAt(position);
  if (!node) {
    return transaction;
  }

  const nodeAttributesIndent = node.attrs.indent as NodeAttributesIndent;

  const nodeIndent =
    typeof nodeAttributesIndent === 'object'
      ? nodeAttributesIndent.indent
      : nodeAttributesIndent;

  const newIndent = (nodeIndent || DEFAULT_INDENT_LEVEL) + delta;
  const indent = Math.min(
    Math.max(newIndent, IndentProperty.MIN),
    IndentProperty.MAX,
  );

  if (indent === node.attrs.indent) {
    return transaction;
  }

  const nodeAttributes = {
    ...node.attrs,
    indent,
  };

  return transaction.setNodeMarkup(
    position,
    node.type,
    nodeAttributes,
    node.marks,
  );
};

export { setNodeIndentMarkup };
