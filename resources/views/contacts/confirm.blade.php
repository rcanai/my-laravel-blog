@extends('_layouts.master')

@section('title')
@lang('route.contacts') |&nbsp;
@endsection

@section('styles')
{{-- <link href="@assetTimestamp(css/contacts.css)" rel="stylesheet"> --}}
@endsection

@section('content')
<div>
  <h1>@lang('label.confirm')</h1>
  <div>
    <div>
      <label for="contact-name">@lang('label.name')</label>
      <p id="contact-name">{{request('name')}}</p>
    </div>
    <div>
      <label for="contact-email">@lang('label.email')</label>
      <p id="contact-email">{{request('email')}}</p>
    </div>
    <div>
      <label for="contact-content">@lang('label.content')</label>
      <p id="contact-content">{{request('content')}}</p>
    </div>
  </div>
  <form action="{{url('contacts/send')}}" method="POST">
    @method('post')
    @csrf
    <input type="hidden" name="name" value="{{request('name')}}">
    <input type="hidden" name="email" value="{{request('email')}}">
    <input type="hidden" name="content" value="{{request('content')}}">
    <div>
      <button type="submit">@lang('label.send')</button>
    </div>
  </form>
</div>
@endsection

@section('scripts')
{{--  --}}
@endsection
