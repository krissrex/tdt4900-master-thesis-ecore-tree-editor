export interface HierarchyConfiguration {
  roots: Set<string>;

  allowedChildren: Map<string, string>;
}
