@extends('_layouts.master')

@section('title')
@lang('route.archives') |&nbsp;
@endsection

@section('styles')
{{--  --}}
@endsection

@section('content')
<div>
  <article>
    <header>
      <h1>@lang('記事一覧')</h1>
    </header>
    <section>
      @include('archives.posts')
    </section>
    <footer>
      {{-- ページネーション --}}
      {{$posts->links()}}
    </footer>
  </article>
</div>
@endsection

@section('scripts')
{{--  --}}
@endsection
