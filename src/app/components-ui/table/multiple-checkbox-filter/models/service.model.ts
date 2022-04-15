export interface GithubApi {
  items: Array<GithubIssue>;
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

export interface Filter {
  query: string;
  state: Array<string>;
}