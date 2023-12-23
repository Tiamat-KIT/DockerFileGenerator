'use client';
import React, { useState, useEffect, useLayoutEffect } from 'react';

export default function Navbar() {
  return (
    <header className="bg-base-100 container mx-auto px-px">
      <span className="navbar">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevContainerFileGenerator</a>
        </div>
        {/**Mobile View */}
        <div className="sm:hidden">
          <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/**Desktop View */}
        <div className="hidden sm:block sm:flex-none">
          <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <li>
              <a>Link 1</a>
            </li>
            <li>
              <a>Link 2</a>
            </li>
          </ul>
        </div>
      </span>
    </header>
  );
}
