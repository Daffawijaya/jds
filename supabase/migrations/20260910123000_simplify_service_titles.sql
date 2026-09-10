-- Keep one canonical service name in application flows while preserving legacy values.
comment on column public.services.hero_tab_label is
  'Deprecated: homepage and admin use services.title as the canonical service name.';

comment on column public.services.hero_eyebrow is
  'Deprecated: homepage uses category_label as the eyebrow.';

comment on column public.services.hero_title is
  'Deprecated: homepage uses services.title as the canonical headline.';
