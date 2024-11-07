module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require the `metadata` fixture in every Playwright test.',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
    messages: {
      missingMetadata: "Test is missing the 'metadata' fixture.",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const isTestCall = node.callee.name === 'test';

        if (isTestCall) {
          const testArgs = node.arguments.find(
            res => res.type === 'ArrowFunctionExpression',
          ).params;

          const hasMetadata = testArgs.some(
            arg =>
              arg.type === 'ObjectPattern' &&
              arg.properties.some(prop => prop.key.name === 'metadata'),
          );

          if (!hasMetadata) {
            context.report({
              node,
              messageId: 'missingMetadata',
            });
          }
        }
      },
    };
  },
};
