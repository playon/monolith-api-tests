module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Disallow the 'metadata' fixture in Playwright hooks (beforeAll, afterAll, beforeEach, afterEach).",
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
    messages: {
      metadataInHook:
        "'metadata' fixture cannot be used inside a Playwright hook.",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const isHookCall = [
          'beforeAll',
          'afterAll',
          'beforeEach',
          'afterEach',
        ].includes(node.callee.name);

        if (isHookCall) {
          const hookArgs = node.arguments;

          const metadataUsedInHook = hookArgs.some(
            arg =>
              arg.params && arg.params.some(param => param.name === 'metadata'),
          );

          if (metadataUsedInHook) {
            context.report({
              node,
              messageId: 'metadataInHook',
            });
          }
        }
      },
    };
  },
};
