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
      <ul>
        @foreach($posts as $post)
        <li>
          <p>{{ $post->title }}</p>
        </li>
        @endforeach
      </ul>
    </section>
    <footer>
      <ol>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ol>
    </footer>
  </article>
</div>
@endsection

@section('scripts')
{{--  --}}
@endsection
