import React from 'react';
import Layout from "../components/layouts/Layout";
import Head from "next/head";
import SettingsDropdown from "../components/elements/SettingsDropdown";

export default function Repertoire() {
    return (
        <Layout title="My Repertoire">
            <h1>This is Repertoire Page</h1>
            <div className="dev">
                <SettingsDropdown />
            </div>

        </Layout>
    )
}