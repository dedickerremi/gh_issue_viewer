import Head from 'next/head'
import styles from '../styles/index.module.scss'
import {useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {NextPage} from "next";
import {useInfiniteQuery} from "@tanstack/react-query";
import InfiniteScroll from 'react-infinite-scroll-component';
import Table from "../src/components/table";
import Form from "../src/components/form";
import Error from "../src/components/error";
import Loader from "../src/components/loader";
import LoaderSVG from "../src/svg/loader";
import {IssueGithub} from "../src/types/IssueGithub";

const GITHUB_API_MAX_ITEMS = 30

const Home: NextPage = () => {
  const [form, setForm] = useState<any>(null)

  const { refetch: fetchIssues, isRefetching, error, data, fetchNextPage, hasNextPage } = useInfiniteQuery<IssueGithub[], any>(['issues', form],  async ({ pageParam = 1}) => {
    const res = await axios.get(`https://api.github.com/repos/${form?.owner}/${form?.repository}/issues?sort=${form?.sort}&page=${pageParam}&direction=${form?.direction}`);
    return res.data
  }, {
    enabled: false,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === GITHUB_API_MAX_ITEMS ? pages.length + 1 : undefined
    }
  })

  const fetchDebounce = () => {
    fetchNextPage()
  }

  useEffect(() => {
    if (form) {
      fetchIssues()
    }
  }, [form, fetchIssues])

  const issues = useMemo(
    () => {
      if (error) return []
      return data?.pages.flatMap(page => page) || []
    },
    [data, error]
  )

  const onSubmit = useCallback((event: any) => {
    event.preventDefault();
    setForm(Object.fromEntries(new FormData(event.currentTarget)));
  }, [])

  const updateFilter = useCallback((filterType: any) => ( direction: any) => {
    if (form) {
      setForm({...form, sort: filterType, direction: direction});
    }
 }, [form])

 return (
    <div className={styles.container}>
      <Head>
        <title>GitHub Issues</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>Github Issue viewer</h1>
      </header>
        <Form onSubmit={onSubmit} />
        <main className={styles.center}>
          { isRefetching ? <Loader /> : null}
          { error ? <Error message={error?.response?.data?.message} /> : null}
          {
            issues?.length > 0 ?
            <InfiniteScroll
              next={fetchDebounce}
              hasMore={!!hasNextPage}
              loader={<div className={styles.center}><LoaderSVG /></div>}
              dataLength={issues?.length}
              scrollThreshold={1}
              endMessage={<div className={styles.center}>No more to see</div>}
            >
              <Table issues={issues} updateFilter={updateFilter} filter={{sort: form?.sort, direction: form?.direction}} />
            </InfiniteScroll>
              : null
          }
        </main>
    </div>
  )
}

export default Home
