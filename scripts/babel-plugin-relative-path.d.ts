import type { PluginObj } from '@babel/core';

type InspectorBabelPluginOptions = {
  cwd?: string;
  excludes?: string[];
};

export default function InspectorBabelPlugin(
  babel: unknown,
  options?: InspectorBabelPluginOptions
): PluginObj;
